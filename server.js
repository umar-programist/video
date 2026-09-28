// VIDA server: видеоҳоро нигоҳ медорад ва ба ҳама нишон медиҳад. Танҳо Node.js лозим аст (бе npm install).
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const UPLOADS = path.join(ROOT, 'uploads');
const DB_FILE = path.join(ROOT, 'data', 'videos.json');
const MAX_BYTES = 800 * 1024 * 1024; // ҳадди аксар барои як видео: 800 МБ
fs.mkdirSync(UPLOADS, { recursive: true });
fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });

let db = [];
try { db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); } catch { db = []; }
const save = () => fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 1));

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime', '.3gp': 'video/3gpp', '.mkv': 'video/x-matroska', '.ogv': 'video/ogg', '.jpg': 'image/jpeg' };
const VIDEO_EXT = { 'video/mp4': '.mp4', 'video/x-m4v': '.mp4', 'video/webm': '.webm', 'video/quicktime': '.mov', 'video/3gpp': '.3gp', 'video/x-matroska': '.mkv', 'video/ogg': '.ogv' };
const PUBLIC_FILES = { '/': 'index.html', '/index.html': 'index.html', '/js.js': 'js.js', '/style.css': 'style.css' };

const send = (res, status, body) => {
	res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
	res.end(JSON.stringify(body));
};
const clean = (value, max) => String(value || '').replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, max);
// Соҳибро (owner) ба ҳеҷ кас нишон намедиҳем, танҳо "mine" (аз они ту)
const view = (record, owner) => ({ id: record.id, title: record.title, category: record.category, duration: record.duration, channel: record.channel, initials: record.initials, createdAt: record.createdAt, url: '/uploads/' + record.file, poster: record.poster ? '/uploads/' + record.poster : '', mine: !!owner && record.owner === owner });

function serveFile(req, res, filePath, cache) {
	fs.stat(filePath, (error, stat) => {
		if (error || !stat.isFile()) return send(res, 404, { error: 'not found' });
		const headers = { 'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream', 'Accept-Ranges': 'bytes', 'Cache-Control': cache };
		const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
		if (range && (range[1] || range[2])) { // барои пеш/қафо бурдани видео дар телефон
			let start = range[1] ? parseInt(range[1], 10) : stat.size - parseInt(range[2], 10);
			let end = range[1] && range[2] ? parseInt(range[2], 10) : stat.size - 1;
			start = Math.max(0, start);
			end = Math.min(end, stat.size - 1);
			if (start > end) { res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` }); return res.end(); }
			res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${stat.size}`, 'Content-Length': end - start + 1 });
			return fs.createReadStream(filePath, { start, end }).on('error', () => res.destroy()).pipe(res);
		}
		res.writeHead(200, { ...headers, 'Content-Length': stat.size });
		fs.createReadStream(filePath).on('error', () => res.destroy()).pipe(res);
	});
}

function handleUpload(req, res, url) {
	const owner = clean(url.searchParams.get('owner'), 80);
	const type = (req.headers['content-type'] || '').split(';')[0].trim().toLowerCase();
	if (!owner || !type.startsWith('video/')) return send(res, 400, { error: 'bad request' });
	if (Number(req.headers['content-length'] || 0) > MAX_BYTES) return send(res, 413, { error: 'too large' });
	const id = crypto.randomBytes(8).toString('hex');
	const file = id + (VIDEO_EXT[type] || '.mp4');
	const target = path.join(UPLOADS, file);
	const out = fs.createWriteStream(target);
	let bytes = 0;
	let failed = false;
	const fail = (status, message) => {
		if (failed) return;
		failed = true;
		req.unpipe(out);
		out.destroy();
		fs.unlink(target, () => {});
		send(res, status, { error: message });
		req.resume();
	};
	req.on('data', chunk => { bytes += chunk.length; if (bytes > MAX_BYTES) fail(413, 'too large'); });
	req.on('error', () => fail(400, 'aborted'));
	req.on('aborted', () => fail(400, 'aborted'));
	out.on('error', () => fail(500, 'write failed'));
	out.on('finish', () => {
		if (failed) return;
		const q = name => url.searchParams.get(name);
		const record = { id, title: clean(q('title'), 120) || 'Видео', category: clean(q('category'), 30) || 'other', duration: clean(q('duration'), 10) || '--:--', channel: clean(q('channel'), 32) || 'Ном нест', initials: clean(q('initials'), 3) || '?', owner, createdAt: Date.now(), file, poster: '' };
		db.push(record);
		save();
		send(res, 201, view(record, owner));
	});
	req.pipe(out);
}

function handlePoster(req, res, url, id) {
	const owner = url.searchParams.get('owner') || '';
	const record = db.find(item => item.id === id);
	if (!record || record.owner !== owner) return send(res, 403, { error: 'forbidden' });
	let body = '';
	req.on('data', chunk => { body += chunk; if (body.length > 3e6) req.destroy(); });
	req.on('end', () => {
		const match = /^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/.exec(body);
		if (!match) return send(res, 400, { error: 'bad poster' });
		const name = id + '.jpg';
		fs.writeFile(path.join(UPLOADS, name), Buffer.from(match[1], 'base64'), error => {
			if (error) return send(res, 500, { error: 'write failed' });
			record.poster = name;
			save();
			send(res, 200, view(record, owner));
		});
	});
}

function handleDelete(res, url, id) {
	const owner = url.searchParams.get('owner') || '';
	const index = db.findIndex(item => item.id === id && item.owner === owner);
	if (index < 0) return send(res, 403, { error: 'forbidden' });
	const [record] = db.splice(index, 1);
	save();
	[record.file, record.poster].filter(Boolean).forEach(name => fs.unlink(path.join(UPLOADS, name), () => {}));
	send(res, 200, { ok: true });
}

const server = http.createServer((req, res) => {
	try {
		const url = new URL(req.url, 'http://localhost');
		const route = url.pathname;
		if (route === '/api/videos' && req.method === 'GET') {
			const owner = url.searchParams.get('owner') || '';
			return send(res, 200, db.slice().sort((a, b) => b.createdAt - a.createdAt).map(item => view(item, owner)));
		}
		if (route === '/api/videos' && req.method === 'POST') return handleUpload(req, res, url);
		let match = /^\/api\/videos\/([a-f0-9]{16})\/poster$/.exec(route);
		if (match && req.method === 'PUT') return handlePoster(req, res, url, match[1]);
		match = /^\/api\/videos\/([a-f0-9]{16})$/.exec(route);
		if (match && req.method === 'DELETE') return handleDelete(res, url, match[1]);
		if (route.startsWith('/uploads/')) {
			const name = path.basename(route);
			if (!/^[a-f0-9]{16}\.[a-z0-9]{2,4}$/.test(name)) return send(res, 404, { error: 'not found' });
			return serveFile(req, res, path.join(UPLOADS, name), 'public, max-age=86400');
		}
		if (PUBLIC_FILES[route]) return serveFile(req, res, path.join(ROOT, PUBLIC_FILES[route]), 'no-cache');
		send(res, 404, { error: 'not found' });
	} catch { send(res, 500, { error: 'server error' }); }
});
server.requestTimeout = 0; // боркунии видеои калон аз телефон вақт мегирад
server.listen(PORT, '0.0.0.0', () => {
	console.log(`VIDA кор мекунад: http://localhost:${PORT}`);
	for (const list of Object.values(os.networkInterfaces()))
		for (const item of list || []) if (item.family === 'IPv4' && !item.internal) console.log(`Аз телефон (як Wi-Fi): http://${item.address}:${PORT}`);
});
