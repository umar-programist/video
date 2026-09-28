// ===== Ислоҳҳо барои Android =====
// 1. uid(): crypto.randomUUID() дар HTTP (Live Server аз телефон) вуҷуд надорад
function uid() {
	if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
	return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}
// 2. Барои WebView-ҳои кӯҳна, ки <dialog>.showModal надоранд
document.querySelectorAll('dialog').forEach(dialog => {
	if (typeof dialog.showModal === 'function') return;
	dialog.showModal = () => dialog.setAttribute('open', '');
	dialog.close = () => { if (dialog.hasAttribute('open')) { dialog.removeAttribute('open'); dialog.dispatchEvent(new Event('close')); } };
});

const icons = {
	home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
	trend: '<path d="m3 17 6-6 4 4 8-9"/><path d="M15 6h6v6"/>',
	play: '<path d="m8 5 12 7-12 7z"/>',
	clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
	heart: '<path d="M20.8 8.7c0 4.4-8.8 10-8.8 10s-8.8-5.6-8.8-10A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.8 2.4Z"/>',
	bookmark: '<path d="M6 4h12v17l-6-4-6 4z"/>',
	users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
	music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
	game: '<path d="M6 12h4m-2-2v4m7-1h.01M18 11h.01"/><path d="M7 7h10a4 4 0 0 1 3.8 2.8l1 3.4A3 3 0 0 1 19 17h-1l-3-3H9l-3 3H5a3 3 0 0 1-2.8-3.8l1-3.4A4 4 0 0 1 7 7Z"/>',
	book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
	tech: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>',
	ball: '<circle cx="12" cy="12" r="9"/><path d="m8 3 2 5-4 3-3-2m9 10-4-3 2-4h5l2 4m-4-13-2 5 4 3 3-2"/>',
	news: '<path d="M4 4h16v16H4z"/><path d="M8 8h8m-8 4h8m-8 4h5"/>',
	film: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4m-4 6h4m10-6h4m-4 6h4"/>',
	smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2m-7-4h.01M15 10h.01"/>',
	travel: '<path d="m3 11 18-7-7 18-3-8z"/><path d="m11 14 5-5"/>',
	food: '<path d="M3 3v7a4 4 0 0 0 4 4h1v7m0-18v5m-4-5v5m13-5v8a4 4 0 0 0 4 4h.5V3"/>',
	science: '<path d="M9 3h6m-5 0v7l-5 8a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-8V3m-7 12h12"/>',
	art: '<path d="M12 3a9 9 0 1 0 0 18h1.5a2.5 2.5 0 0 0 1.7-4.3 1.5 1.5 0 0 1 1.1-2.7H19a2 2 0 0 0 2-2A9 9 0 0 0 12 3Z"/><path d="M7.5 10h.01M11 7h.01m4 1h.01m-8 7h.01"/>',
	mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2m-7 9v3m-4 0h8"/>',
	history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5m4-1v5l3 2"/>',
	leaf: '<path d="M20 4c-8 0-14 3-14 10a6 6 0 0 0 6 6c7 0 9-8 8-16Z"/><path d="M4 21c2-5 6-8 12-11"/>',
	spark: '<path d="m12 3 1.9 5.8L20 11l-6.1 2.1L12 19l-1.9-5.9L4 11l6.1-2.2L12 3Z"/><path d="m19 14 1.2 2.3L22 17l-1.8.7L19 20l-1.2-2.3L16 17l1.8-.7L19 14Z"/>'
};

const pages = [
	{ id: 'home', label: 'Асосӣ', icon: 'home', group: 'library' },
	{ id: 'trending', label: 'Тамоюлҳо', icon: 'trend', group: 'library' },
	{ id: 'subscriptions', label: 'Обунаҳо', icon: 'users', group: 'library' },
	{ id: 'history', label: 'Таърихи тамошо', icon: 'history', group: 'library' },
	{ id: 'watch-later', label: 'Баъдтар тамошо', icon: 'bookmark', group: 'library' },
	{ id: 'liked', label: 'Видеои писандида', icon: 'heart', group: 'library' },
	{ id: 'music', label: 'Мусиқӣ', icon: 'music', group: 'topic' },
	{ id: 'gaming', label: 'Бозиҳо', icon: 'game', group: 'topic' },
	{ id: 'learning', label: 'Омӯзиш', icon: 'book', group: 'topic' },
	{ id: 'technology', label: 'Технология', icon: 'tech', group: 'topic' },
	{ id: 'sports', label: 'Варзиш', icon: 'ball', group: 'topic' },
	{ id: 'news', label: 'Хабарҳо', icon: 'news', group: 'topic' },
	{ id: 'cinema', label: 'Синамо', icon: 'film', group: 'topic' },
	{ id: 'comedy', label: 'Ханда', icon: 'smile', group: 'topic' },
	{ id: 'travel', label: 'Саёҳат', icon: 'travel', group: 'topic' },
	{ id: 'cooking', label: 'Пухтупаз', icon: 'food', group: 'topic' },
	{ id: 'science', label: 'Илм', icon: 'science', group: 'topic' },
	{ id: 'art', label: 'Санъат', icon: 'art', group: 'topic' },
	{ id: 'podcasts', label: 'Подкастҳо', icon: 'mic', group: 'topic' },
	{ id: 'nature', label: 'Табиат', icon: 'leaf', group: 'topic' }
];

const videos = [
	{ id: 'v01', title: 'Як субҳи ором дар кӯҳҳои Помир', channel: 'Роҳи Кӯҳистон', initials: 'РК', views: '128 ҳазор', age: '2 рӯз пеш', duration: '18:42', category: 'travel', tags: ['travel', 'nature'], image: 'photo-1464822759023-fed622ff2c3b' },
	{ id: 'v02', title: 'Садои шаҳр: мусиқӣ барои роҳи дароз', channel: 'Садои Нав', initials: 'СН', views: '84 ҳазор', age: '1 рӯз пеш', duration: '32:15', category: 'music', tags: ['music'], image: 'photo-1519608487953-e999c86e7455' },
	{ id: 'v03', title: 'Чӣ тавр вебсайти аввалини худро созед', channel: 'Рамзи Сода', initials: 'РС', views: '56 ҳазор', age: '3 рӯз пеш', duration: '24:08', category: 'technology', tags: ['technology', 'learning'], image: 'photo-1519389950473-47ba0277781c' },
	{ id: 'v04', title: 'Дар дохили бозии нав: 10 дақиқаи аввал', channel: 'Бозӣ ТВ', initials: 'БТ', views: '203 ҳазор', age: '5 соат пеш', duration: '14:36', category: 'gaming', tags: ['gaming'], image: 'photo-1542751371-adc38448a05e' },
	{ id: 'v05', title: 'Хӯроки шоми зуд бо маҳсулоти хонагӣ', channel: 'Ошхонаи Меҳр', initials: 'ОМ', views: '91 ҳазор', age: '6 рӯз пеш', duration: '12:54', category: 'cooking', tags: ['cooking'], image: 'photo-1547592180-85f173990554' },
	{ id: 'v06', title: 'Сайёраи Замин аз кайҳон: тасвирҳои нав', channel: 'Уфуқи Илм', initials: 'УИ', views: '310 ҳазор', age: '1 ҳафта пеш', duration: '21:03', category: 'science', tags: ['science', 'nature'], image: 'photo-1446776811953-b23d57bd21aa' },
	{ id: 'v07', title: 'Финали пурҳаяҷони мусобиқаи шаҳрӣ', channel: 'Варзиш Плюс', initials: 'ВП', views: '176 ҳазор', age: '12 соат пеш', duration: '09:47', category: 'sports', tags: ['sports'], image: 'photo-1461896836934-ffe607ba8211' },
	{ id: 'v08', title: 'Ҳикояи кӯтоҳ: роҳе, ки моро ёфт', channel: 'Чароғи Сафед', initials: 'ЧС', views: '42 ҳазор', age: '4 рӯз пеш', duration: '16:20', category: 'cinema', tags: ['cinema', 'art'], image: 'photo-1489599849927-2ee91cede3ba' },
	{ id: 'v09', title: 'Вақте нақшаи истироҳат ин тавр мешавад', channel: 'Хандаи Беист', initials: 'ХБ', views: '392 ҳазор', age: '1 рӯз пеш', duration: '08:12', category: 'comedy', tags: ['comedy'], image: 'photo-1529139574466-a303027c1d8b' },
	{ id: 'v10', title: 'Наққошӣ аз сифр: рангу рӯшноӣ', channel: 'Ателиё', initials: 'АТ', views: '34 ҳазор', age: '2 ҳафта пеш', duration: '27:31', category: 'art', tags: ['art', 'learning'], image: 'photo-1513364776144-60967b0f800f' },
	{ id: 'v11', title: 'Ахбори ҳафта дар панҷ дақиқа', channel: 'Имрӯз', initials: 'ИМ', views: '117 ҳазор', age: '3 соат пеш', duration: '05:18', category: 'news', tags: ['news'], image: 'photo-1504711434969-e33886168f5c' },
	{ id: 'v12', title: 'Сӯҳбат дар бораи идеяҳои калон', channel: 'Чой ва Фикр', initials: 'ЧФ', views: '65 ҳазор', age: '5 рӯз пеш', duration: '41:02', category: 'podcasts', tags: ['podcasts', 'learning'], image: 'photo-1478737270239-2f02b77fc618' },
	{ id: 'v13', title: 'Сафари якрӯза ба кӯли кӯҳӣ', channel: 'Роҳи Кӯҳистон', initials: 'РК', views: '73 ҳазор', age: '8 рӯз пеш', duration: '15:55', category: 'travel', tags: ['travel', 'nature'], image: 'photo-1500530855697-b586d89ba3ee' },
	{ id: 'v14', title: 'Оҳанги нав дар студияи хонагӣ', channel: 'Садои Нав', initials: 'СН', views: '49 ҳазор', age: '2 рӯз пеш', duration: '11:29', category: 'music', tags: ['music', 'art'], image: 'photo-1516280440614-37939bbacd81' },
	{ id: 'v15', title: 'Панҷ чизе, ки дар бораи хотира намедонистед', channel: 'Уфуқи Илм', initials: 'УИ', views: '220 ҳазор', age: '3 рӯз пеш', duration: '13:44', category: 'science', tags: ['science', 'learning'], image: 'photo-1532094349884-543bc11b234d' },
	{ id: 'v16', title: 'Мусобиқаи дӯстона: бозии ҳалкунанда', channel: 'Бозӣ ТВ', initials: 'БТ', views: '146 ҳазор', age: '9 соат пеш', duration: '22:17', category: 'gaming', tags: ['gaming'], image: 'photo-1511512578047-dfb367046420' },
	{ id: 'v17', title: 'Се роҳи одӣ барои омӯхтани забон', channel: 'Рамзи Сода', initials: 'РС', views: '98 ҳазор', age: '1 ҳафта пеш', duration: '19:06', category: 'learning', tags: ['learning'], image: 'photo-1455390582262-044c35230a13' },
	{ id: 'v18', title: 'Дунёи ороми боғ пас аз борон', channel: 'Роҳи Кӯҳистон', initials: 'РК', views: '61 ҳазор', age: '6 рӯз пеш', duration: '10:34', category: 'nature', tags: ['nature'], image: 'photo-1441974231531-c6227db76b6e' },
	{ id: 'v19', title: 'Технологияи хурд, тағйироти калон', channel: 'Рамзи Сода', initials: 'РС', views: '158 ҳазор', age: '2 рӯз пеш', duration: '17:50', category: 'technology', tags: ['technology', 'science'], image: 'photo-1518770660439-4636190af475' },
	{ id: 'v20', title: 'Рӯзи пухтупаз бо бибиҷон', channel: 'Ошхонаи Меҳр', initials: 'ОМ', views: '182 ҳазор', age: '4 рӯз пеш', duration: '20:11', category: 'cooking', tags: ['cooking'], image: 'photo-1556911220-bff31c812dba' },
	{ id: 'v21', title: 'Чӣ гуна филм як эҳсосро нақл мекунад', channel: 'Чароғи Сафед', initials: 'ЧС', views: '45 ҳазор', age: '1 ҳафта пеш', duration: '26:13', category: 'cinema', tags: ['cinema', 'learning'], image: 'photo-1478720568477-152d9b164e26' },
	{ id: 'v22', title: 'Мусоҳиба бо рассоми ҷавон', channel: 'Ателиё', initials: 'АТ', views: '22 ҳазор', age: '3 рӯз пеш', duration: '29:40', category: 'art', tags: ['art', 'podcasts'], image: 'photo-1455390582262-044c35230a13' },
	{ id: 'v23', title: 'Беҳтарин лаҳзаҳои ҳафтаи варзиш', channel: 'Варзиш Плюс', initials: 'ВП', views: '284 ҳазор', age: '2 рӯз пеш', duration: '12:08', category: 'sports', tags: ['sports'], image: 'photo-1521412644187-c49fa049e84d' },
	{ id: 'v24', title: 'Мо ҳамаашро нодуруст фаҳмидем', channel: 'Хандаи Беист', initials: 'ХБ', views: '516 ҳазор', age: '7 соат пеш', duration: '07:38', category: 'comedy', tags: ['comedy'], image: 'photo-1524504388940-b1c1722653e1' }
];

const pageCopy = {
	home: ['Барои шумо', 'Интихобҳои тоза аз тамоми VIDA.'],
	trending: ['Дар тамоюл', 'Видеоҳои бештар тамошошудаи имрӯз.'],
	subscriptions: ['Каналҳои шумо', 'Навтарин видеоҳо аз каналҳои шинос.'],
	history: ['Таърихи тамошо', 'Видеоҳои ахире, ки тамошо кардед.'],
	'watch-later': ['Баъдтар тамошо', 'Видеоҳои захиракардаатон дар ҳамин ҷо мемонанд.'],
	liked: ['Писандидаҳо', 'Ҳамаи видеоҳои писандидаатон.'],
	music: ['Мусиқӣ', 'Оҳангҳо, иҷроҳои зинда ва садоҳои нав.'],
	gaming: ['Бозиҳо', 'Бозӣ кун, тамошо кун, кашф кун.'],
	learning: ['Омӯзиш', 'Идеяҳои нав, бо роҳи фаҳмо.'],
	technology: ['Технология', 'Навгониҳо аз олами технология ва рақамӣ.'],
	sports: ['Варзиш', 'Бозиҳо, лаҳзаҳои муҳим ва ҳикояҳои варзишӣ.'],
	news: ['Хабарҳо', 'Ҳодисаҳои имрӯз аз манбаъҳои гуногун.'],
	cinema: ['Синамо', 'Филмҳои кӯтоҳ ва ҳикояҳои дароз.'],
	comedy: ['Ханда', 'Каме ханда ҳам рӯзи хуб месозад.'],
	travel: ['Саёҳат', 'Ҷойҳои навро аз наздик бинед.'],
	cooking: ['Пухтупаз', 'Дастурхони болаззат ва идеяҳои осон.'],
	science: ['Илм', 'Саволҳои бузург, ҷавобҳои ҷолиб.'],
	art: ['Санъат', 'Ранг, фикр ва ҳикояҳои эҷодӣ.'],
	podcasts: ['Подкастҳо', 'Сӯҳбатҳои ҷолибро гӯш кунед ва тамошо кунед.'],
	nature: ['Табиат', 'Лаҳзаҳои ором аз олами зинда.']
};

const view = document.querySelector('#pageView');
const mainNav = document.querySelector('#mainNav');
const searchInput = document.querySelector('#searchInput');
const profileButton = document.querySelector('#profileButton');
const profileAvatar = document.querySelector('#profileAvatar');
const profileNameLabel = document.querySelector('#profileName');
const profilesDialog = document.querySelector('#profilesDialog');
const profileList = document.querySelector('#profileList');
const createProfileForm = document.querySelector('#createProfileForm');
const newProfileName = document.querySelector('#newProfileName');
let activeChip = 'Ҳама';
let toastTimer;

function formatDate() {
	const months = ['январ', 'феврал', 'март', 'апрел', 'май', 'июн', 'июл', 'август', 'сентябр', 'октябр', 'ноябр', 'декабр'];
	const today = new Date();
	return `${today.getDate()} ${months[today.getMonth()]}`;
}

function saveProfiles() {
	try { localStorage.setItem('vida-profiles', JSON.stringify(profiles)); }
	catch { showToast('Профилро нигоҳ дошта натавонист.'); }
}

function profileInitial(name) {
	return Array.from(name.trim())[0]?.toLocaleUpperCase('tg') || 'П';
}

function renderProfileHeader() {
	profileAvatar.textContent = profileInitial(activeProfile.name);
	profileNameLabel.textContent = activeProfile.name;
	profileButton.setAttribute('aria-label', `Профили фаъол: ${activeProfile.name}. Иваз кардани профил`);
}

function renderProfileList() {
	profileList.replaceChildren();
	for (const profile of profiles) {
		const choice = document.createElement('button');
		choice.type = 'button';
		choice.className = `profile-choice ${profile.id === activeProfile.id ? 'active' : ''}`;
		choice.dataset.profileId = profile.id;
		const avatar = document.createElement('span');
		avatar.className = 'profile-choice-avatar';
		avatar.textContent = profileInitial(profile.name);
		const details = document.createElement('span');
		details.className = 'profile-choice-details';
		const name = document.createElement('strong');
		name.textContent = profile.name;
		const count = document.createElement('span');
		count.textContent = `${userVideos.filter(video => video.ownerId === profile.id).length} видео`;
		details.append(name, count);
		const state = document.createElement('span');
		state.className = 'profile-choice-state';
		state.textContent = profile.id === activeProfile.id ? 'ФАЪОЛ' : '';
		choice.append(avatar, details, state);
		profileList.append(choice);
	}
}

function switchProfile(profileId) {
	const selectedProfile = profiles.find(profile => profile.id === profileId);
	if (!selectedProfile) return;
	activeProfile = selectedProfile;
	try { localStorage.setItem('vida-active-profile', activeProfile.id); }
	catch { }
	searchInput.value = '';
	activeChip = 'Ҳама';
	renderProfileHeader();
	render();
}

function openProfilesDialog() {
	renderProfileList();
	profilesDialog.showModal();
}

function loadProfiles() {
	try {
		const saved = JSON.parse(localStorage.getItem('vida-profiles') || 'null');
		if (Array.isArray(saved) && saved.length) return saved;
	} catch { }
	const initial = [{ id: 'profile-main', name: 'Ман', createdAt: Date.now() }];
	try { localStorage.setItem('vida-profiles', JSON.stringify(initial)); }
	catch { }
	return initial;
}

let profiles = loadProfiles();
let activeProfile = profiles[0];
try { activeProfile = profiles.find(profile => profile.id === localStorage.getItem('vida-active-profile')) || profiles[0]; } catch { }
try { localStorage.setItem('vida-active-profile', activeProfile.id); }
catch { }

function getStored(key) {
	const storageKey = `vida:${activeProfile.id}:${key}`;
	try {
		const saved = localStorage.getItem(storageKey);
		if (saved !== null) return JSON.parse(saved);
		if (activeProfile.id === profiles[0].id) {
			const legacy = localStorage.getItem(`vida-${key}`);
			if (legacy !== null) {
				localStorage.setItem(storageKey, legacy);
				return JSON.parse(legacy);
			}
		}
		return [];
 	}
	catch { return []; }
}

function setStored(key, value) {
	try { localStorage.setItem(`vida:${activeProfile.id}:${key}`, JSON.stringify(value)); }
	catch { showToast('Захиракунӣ дар ин браузер дастрас нест.'); }
}

function svgIcon(name) {
	return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.play}</svg>`;
}

function buildNav() {
	const columns = Math.ceil(pages.length / 3);
	for (let column = 0; column < columns; column++) {
		for (let row = 0; row < 3; row++) {
			const page = pages[row * columns + column];
			if (!page) continue;
			const link = document.createElement('a');
			link.className = 'nav-link';
			link.href = `#${page.id}`;
			link.dataset.page = page.id;
			link.innerHTML = `<span class="nav-icon">${svgIcon(page.icon)}</span><span>${page.label}</span>`;
			mainNav.append(link);
		}
	}
}

function filteredVideos(pageId, query = '') {
	const saved = getStored(pageId === 'liked' ? 'liked' : 'later');
	let result = videos.filter(video => {
		if (pageId === 'watch-later' || pageId === 'liked') return saved.includes(video.id);
		if (pageId === 'history') return getStored('history').includes(video.id);
		if (pageId === 'subscriptions') return ['Роҳи Кӯҳистон', 'Садои Нав', 'Рамзи Сода', 'Бозӣ ТВ'].includes(video.channel);
		if (pageId === 'trending') return Number.parseInt(video.views, 10) > 100;
		if (pageId === 'home') return true;
		return video.tags.includes(pageId);
	});
	if (query) {
		const term = query.trim().toLocaleLowerCase('tg');
		result = videos.filter(video => `${video.title} ${video.channel} ${video.category}`.toLocaleLowerCase('tg').includes(term));
	}
	if (activeChip !== 'Ҳама' && !query && pageId !== 'watch-later' && pageId !== 'liked' && pageId !== 'history') {
		result = result.filter(video => video.category === activeChip);
	}
	return result;
}

function videoCard(video, index) {
	const saved = getStored('later').includes(video.id);
	const liked = getStored('liked').includes(video.id);
	return `<article class="video-card" style="animation-delay:${Math.min(index * 35, 245)}ms">
		<button class="thumb-button" data-watch="${video.id}" aria-label="Тамошо кардан: ${video.title}">
			<img src="https://images.unsplash.com/${video.image}?auto=format&fit=crop&w=720&q=80" alt="" loading="lazy">
			<span class="thumb-shade"></span><span class="quality-tag">HD</span><span class="duration">${video.duration}</span>
			<span class="card-play"><span><i class="play-triangle"></i></span></span>
		</button>
		<div class="card-body">
			<span class="channel-avatar avatar-${index % 4}">${video.initials}</span>
			<div><h3 class="card-title">${video.title}</h3><p class="card-channel">${video.channel}</p><p class="card-stats">${video.views} тамошо · ${video.age}</p></div>
			<div class="card-actions">
				<button class="card-menu ${liked ? 'is-active' : ''}" data-save="${video.id}" data-save-list="liked" title="${liked ? 'Аз писандидаҳо гиред' : 'Ба писандидаҳо илова кунед'}" aria-label="${liked ? 'Аз писандидаҳо гирифтан' : 'Писандидан'}">${svgIcon('heart')}</button>
				<button class="card-menu ${saved ? 'is-active' : ''}" data-save="${video.id}" data-save-list="later" title="${saved ? 'Аз баъдтар тамошо гиред' : 'Барои баъдтар захира кунед'}" aria-label="${saved ? 'Аз рӯйхати баъдтар гирифтан' : 'Баъдтар тамошо кардан'}">${svgIcon('bookmark')}</button>
			</div>
		</div>
	</article>`;
}

function render({ query = '' } = {}) {
	const pageId = location.hash.slice(1).split('?')[0] || 'home';
	const page = pages.find(item => item.id === pageId) || pages[0];
	const [heading, subtitle] = pageCopy[page.id] || pageCopy.home;
	const isHome = page.id === 'home' && !query;
	const videosToShow = filteredVideos(page.id, query);
	document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.dataset.page === page.id));
	document.title = `${query ? 'Ҷустуҷӯ' : heading} — VIDA`;

	const chips = ['Ҳама', 'music', 'gaming', 'learning', 'technology', 'travel', 'science', 'sports'];
	const chipLabels = { Ҳама: 'Ҳама', music: 'Мусиқӣ', gaming: 'Бозиҳо', learning: 'Омӯзиш', technology: 'Технология', travel: 'Саёҳат', science: 'Илм', sports: 'Варзиш' };
	const emptyText = page.id === 'watch-later' ? 'Ҳоло видео захира нашудааст' : page.id === 'liked' ? 'Ҳоло видеои писандида нест' : page.id === 'history' ? 'Таърихи тамошо холӣ аст' : 'Видео ёфт нашуд';

	view.innerHTML = `<div class="content-wrap">
		<div class="page-heading"><div><p class="eyebrow">${query ? 'НАТИҶАИ ҶУСТУҶӮ' : isHome ? 'ХУШ ОМАДЕД БА VIDA' : 'КАНАЛИ ШУМО'}</p><h1>${query ? `Ҷустуҷӯ: “${escapeHtml(query)}”` : heading}</h1><p class="page-subtitle">${query ? `Барои “${escapeHtml(query)}” ${videosToShow.length} видео ёфт шуд.` : subtitle}</p></div><span class="heading-date">${formatDate()}</span></div>
		${isHome ? `<section class="hero" aria-label="Видеоҳои пешниҳодшуда"><img class="hero-image" src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1500&q=85" alt="Қуллаҳои кӯҳ дар нури субҳ"><div class="hero-copy"><span class="hero-kicker">Интихоби VIDA · имрӯз</span><h2>Ҷаҳонро аз роҳи нав бинед</h2><p class="hero-description">Саёҳати ором аз водиҳо то қуллаҳои Помир. Ҳикояҳое, ки мехоҳед то охир тамошо кунед.</p><div class="hero-buttons"><button class="primary-button" data-watch="v01"><i class="play-triangle"></i> Тамошо кардан</button><button class="quiet-button" data-save="v01"><span>＋</span> Баъдтар</button></div></div><span class="hero-meta">Роҳи Кӯҳистон · 18 дақиқа</span></section>` : ''}
		<section aria-labelledby="videoHeading">
			<div class="section-heading"><div><h2 id="videoHeading">${query ? 'Видеоҳо' : isHome ? 'Кашф кунед' : 'Видеоҳо'}</h2>${!query && isHome ? '<p>Чизҳои нав барои тамошои имрӯз</p>' : ''}</div><button class="section-link" data-page="trending">Ҳамаи тамоюлҳо <span aria-hidden="true">→</span></button></div>
			${isHome ? `<div class="chips" aria-label="Филтр аз рӯи мавзӯъ">${chips.map(chip => `<button class="chip ${activeChip === chip ? 'active' : ''}" data-chip="${chip}">${chipLabels[chip]}</button>`).join('')}</div>` : ''}
			<div class="video-grid">${videosToShow.length ? videosToShow.map(videoCard).join('') : `<div class="empty-state"><span class="empty-symbol">${page.id === 'watch-later' ? '＋' : '◌'}</span><strong>${emptyText}</strong><p>${page.id === 'watch-later' || page.id === 'liked' ? 'Аз менюи видеоҳо истифода баред, то ин рӯйхатро пур кунед.' : 'Калимаи дигарро ҷустуҷӯ кунед ё мавзӯи дигарро интихоб намоед.'}</p></div>`}</div>
		</section>
	</div>`;
}

function escapeHtml(value) {
	return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function showToast(message) {
	const toast = document.querySelector('#toast');
	toast.textContent = message;
	toast.classList.add('visible');
	clearTimeout(toastTimer);
	toastTimer = setTimeout(() => toast.classList.remove('visible'), 2300);
}

function toggleSaved(videoId, listName) {
	const stored = getStored(listName);
	const exists = stored.includes(videoId);
	setStored(listName, exists ? stored.filter(id => id !== videoId) : [videoId, ...stored]);
	showToast(exists ? 'Аз рӯйхат гирифта шуд.' : listName === 'liked' ? 'Ба писандидаҳо илова шуд.' : 'Барои тамошои баъдӣ захира шуд.');
	render({ query: searchInput.value });
}

const videoCategories = [
	{ id: 'music', label: 'Мусиқӣ', icon: 'music' },
	{ id: 'cinema', label: 'Синамо', icon: 'film' },
	{ id: 'gaming', label: 'Бозиҳо', icon: 'game' },
	{ id: 'technology', label: 'Технология', icon: 'tech' },
	{ id: 'education', label: 'Омӯзиш', icon: 'book' },
	{ id: 'science', label: 'Илм', icon: 'science' },
	{ id: 'travel', label: 'Саёҳат', icon: 'travel' },
	{ id: 'cooking', label: 'Пухтупаз', icon: 'food' },
	{ id: 'sports', label: 'Варзиш', icon: 'ball' },
	{ id: 'news', label: 'Хабарҳо', icon: 'news' },
	{ id: 'comedy', label: 'Ханда', icon: 'smile' },
	{ id: 'animals', label: 'Ҳайвонот', icon: 'leaf' },
	{ id: 'nature', label: 'Табиат', icon: 'leaf' },
	{ id: 'history-topic', label: 'Таърих', icon: 'history' },
	{ id: 'art', label: 'Санъат', icon: 'art' },
	{ id: 'podcasts', label: 'Подкастҳо', icon: 'mic' },
	{ id: 'fashion', label: 'Мӯд', icon: 'spark' },
	{ id: 'health', label: 'Саломатӣ', icon: 'heart' },
	{ id: 'business', label: 'Тиҷорат', icon: 'trend' },
	{ id: 'automotive', label: 'Автомобил', icon: 'tech' },
	{ id: 'space', label: 'Кайҳон', icon: 'science' },
	{ id: 'diy', label: 'Ҳунармандӣ', icon: 'art' },
	{ id: 'family', label: 'Оила', icon: 'users' },
	{ id: 'other', label: 'Дигар', icon: 'spark' }
];

pages.splice(0, pages.length,
	{ id: 'home', label: 'Асосӣ', icon: 'home', group: 'library' },
	{ id: 'my-videos', label: 'Видеоҳои ман', icon: 'film', group: 'library' },
	{ id: 'history', label: 'Таърихи тамошо', icon: 'history', group: 'library' },
	{ id: 'watch-later', label: 'Баъдтар тамошо', icon: 'bookmark', group: 'library' },
	{ id: 'liked', label: 'Писандидаҳо', icon: 'heart', group: 'library' },
	...videoCategories.map(category => ({ ...category, group: 'topic' }))
);

const userVideos = videos;
userVideos.splice(0, userVideos.length);
const categoryNames = Object.fromEntries(videoCategories.map(category => [category.id, category.label]));
pageCopy.home = ['Китобхонаи ман', 'Видеоҳои худро илова карда, дар ҳамин ҷо ҷамъ кунед.'];
pageCopy['my-videos'] = ['Видеоҳои ман', 'Ҳамаи файлҳои видеоии илова кардаи шумо.'];
for (const category of videoCategories) pageCopy[category.id] = [category.label, `Видеоҳои шахсии шумо дар мавзӯи «${category.label}».`];
const uploadDialog = document.querySelector('#uploadDialog');
const uploadForm = document.querySelector('#uploadForm');
const videoFilesInput = document.querySelector('#videoFiles');
const uploadCategory = document.querySelector('#uploadCategory');
const selectedFiles = document.querySelector('#selectedFiles');
const confirmUpload = document.querySelector('#confirmUpload');
const playerDialog = document.querySelector('#playerDialog');
const videoPlayer = document.querySelector('#videoPlayer');

function formatDuration(seconds) {
	if (!Number.isFinite(seconds) || seconds < 0) return '--:--';
	const minutes = Math.floor(seconds / 60);
	const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
	return `${minutes}:${remainder}`;
}

function openVideoDatabase() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open('vida-local-library', 1);
		request.onupgradeneeded = () => request.result.createObjectStore('videos', { keyPath: 'id' });
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

async function readVideoRecords() {
	const database = await openVideoDatabase();
	return new Promise((resolve, reject) => {
		const request = database.transaction('videos', 'readonly').objectStore('videos').getAll();
		request.onsuccess = () => { database.close(); resolve(request.result); };
		request.onerror = () => { database.close(); reject(request.error); };
	});
}

async function saveVideoRecords(records) {
	const database = await openVideoDatabase();
	return new Promise((resolve, reject) => {
		const transaction = database.transaction('videos', 'readwrite');
		for (const record of records) transaction.objectStore('videos').put(record);
		transaction.oncomplete = () => { database.close(); resolve(); };
		transaction.onerror = () => { database.close(); reject(transaction.error); };
	});
}

function readVideoDetails(file) {
	return new Promise(resolve => {
		const source = URL.createObjectURL(file);
		const video = document.createElement('video');
		video.preload = 'metadata';
		video.playsInline = true;
		video.setAttribute('playsinline', '');
		video.muted = true;
		let complete = false;
		let duration = '--:--';
		const finish = poster => {
			if (complete) return;
			complete = true;
			video.removeAttribute('src');
			video.load();
			URL.revokeObjectURL(source);
			resolve({ duration, poster });
		};
		const updateDuration = () => {
			if (Number.isFinite(video.duration) && video.duration > 0) duration = formatDuration(video.duration);
		};
		const capturePoster = () => {
			updateDuration();
			if (!video.videoWidth || !video.videoHeight) return;
			try {
				const canvas = document.createElement('canvas');
				canvas.width = 640;
				canvas.height = 360;
				canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
				finish(canvas.toDataURL('image/jpeg', 0.75));
			} catch { finish(''); }
		};
		video.addEventListener('durationchange', updateDuration);
		video.addEventListener('loadedmetadata', updateDuration, { once: true });
		video.addEventListener('loadedmetadata', () => { try { video.currentTime = Math.min(1, (video.duration || 2) / 2); } catch { } }, { once: true });
		video.addEventListener('seeked', capturePoster, { once: true });
		video.addEventListener('loadeddata', () => setTimeout(capturePoster, 700), { once: true });
		video.addEventListener('error', () => finish(''), { once: true });
		video.src = source;
		video.load();
		setTimeout(() => finish(''), 9000);
	});
}

function filteredVideos(pageId, query = '') {
	const saved = pageId === 'liked' ? getStored('liked') : pageId === 'watch-later' ? getStored('later') : getStored('history');
	let result = userVideos.filter(video => video.ownerId === activeProfile.id && (() => {
		if (pageId === 'liked' || pageId === 'watch-later' || pageId === 'history') return saved.includes(video.id);
		if (categoryNames[pageId]) return video.category === pageId;
		return true;
	})());
	if (query) {
		const term = query.trim().toLocaleLowerCase('tg');
		result = userVideos.filter(video => video.ownerId === activeProfile.id && `${video.title} ${video.channel} ${categoryNames[video.category] || ''}`.toLocaleLowerCase('tg').includes(term));
	}
	if (activeChip !== 'Ҳама' && !query && pageId === 'home') result = result.filter(video => video.category === activeChip);
	return result.sort((first, second) => second.createdAt - first.createdAt);
}

function videoCard(video, index) {
	const saved = getStored('later').includes(video.id);
	const liked = getStored('liked').includes(video.id);
	const poster = video.poster ? `<img src="${video.poster}" alt="" loading="lazy">` : `<span class="local-poster-label">${escapeHtml(categoryNames[video.category] || 'Видео')}</span>`;
	return `<article class="video-card" style="animation-delay:${Math.min(index * 35, 245)}ms">
		<button class="thumb-button" data-watch="${video.id}" aria-label="Тамошо кардан: ${escapeHtml(video.title)}">
			${poster}<span class="thumb-shade"></span><span class="local-tag">ШАХСӢ</span><span class="duration">${escapeHtml(video.duration)}</span>
			<span class="card-play"><span><i class="play-triangle"></i></span></span>
		</button>
		<div class="card-body">
			<span class="channel-avatar">${escapeHtml(video.initials)}</span>
			<div><h3 class="card-title">${escapeHtml(video.title)}</h3><p class="card-channel">${escapeHtml(categoryNames[video.category] || 'Видеоҳои ман')}</p><p class="card-stats">Илова шуд · ${formatDate()}</p></div>
			<div class="card-actions">
				<button class="card-menu ${liked ? 'is-active' : ''}" data-save="${video.id}" data-save-list="liked" title="${liked ? 'Аз писандидаҳо гиред' : 'Ба писандидаҳо илова кунед'}" aria-label="${liked ? 'Аз писандидаҳо гирифтан' : 'Писандидан'}">${svgIcon('heart')}</button>
				<button class="card-menu ${saved ? 'is-active' : ''}" data-save="${video.id}" data-save-list="later" title="${saved ? 'Аз баъдтар тамошо гиред' : 'Барои баъдтар захира кунед'}" aria-label="${saved ? 'Аз рӯйхати баъдтар гирифтан' : 'Баъдтар тамошо кардан'}">${svgIcon('bookmark')}</button>
			</div>
		</div>
	</article>`;
}

function render({ query = '' } = {}) {
	const pageId = location.hash.slice(1).split('?')[0] || 'home';
	const page = pages.find(item => item.id === pageId) || pages[0];
	const pageTitle = pageCopy[page.id]?.[0] || page.label;
	const pageSubtitle = pageCopy[page.id]?.[1] || `Видеоҳои шахсии шумо дар бахши «${page.label}».`;
	const isHome = page.id === 'home' && !query;
	const videosToShow = filteredVideos(page.id, query);
	document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.dataset.page === page.id));
	document.title = `${query ? 'Ҷустуҷӯ' : pageTitle} — VIDA`;
	const chips = ['Ҳама', ...videoCategories.slice(0, 8).map(category => category.id)];
	const labels = { Ҳама: 'Ҳама', ...categoryNames };
	const emptyTitle = page.id === 'liked' ? 'Ҳоло видеои писандида нест' : page.id === 'watch-later' ? 'Рӯйхати тамошо холӣ аст' : page.id === 'history' ? 'Таърихи тамошо холӣ аст' : 'Китобхона ҳоло холӣ аст';
	const emptyCopy = page.id === 'liked' || page.id === 'watch-later' || page.id === 'history' ? 'Видеоҳоро тамошо кунед ё захира намоед, то ин рӯйхат пур шавад.' : 'Видеоҳои худро аз компютер интихоб карда, дар ҳамин ҷо тамошо кунед.';

	view.innerHTML = `<div class="content-wrap">
		<div class="page-heading"><div><p class="eyebrow">${query ? 'НАТИҶАИ ҶУСТУҶӮ' : isHome ? 'КИТОБХОНАИ ШАХСӢ' : 'ВИДЕОҲОИ ШУМО'}</p><h1>${query ? `Ҷустуҷӯ: “${escapeHtml(query)}”` : pageTitle}</h1><p class="page-subtitle">${query ? `${videosToShow.length} натиҷа ёфт шуд.` : pageSubtitle}</p></div><span class="heading-date">${formatDate()}</span></div>
		${isHome ? `<section class="hero" aria-label="Китобхонаи видеоии шумо"><div class="hero-copy"><span class="hero-kicker">ВИДЕОҲОИ ХУДАТОН · ҲАМА ДАР ЯК ҶО</span><h2>Китобхонаи видеоии худро созед</h2><p class="hero-description">Видеоҳои худро илова кунед, аз рӯи 24 мавзӯъ ҷудо намоед ва мустақим дар ҳамин ҷо тамошо кунед.</p><div class="hero-buttons"><button class="primary-button" data-open-upload><span>＋</span> Илова кардани видео</button><button class="quiet-button" data-page="my-videos">Китобхонаи ман</button></div></div><span class="hero-meta">24 мавзӯъ · плеери дохилӣ</span></section>` : ''}
		<section aria-labelledby="videoHeading">
			<div class="section-heading"><div><h2 id="videoHeading">${query ? 'Натиҷаҳо' : isHome ? 'Видеоҳои шумо' : 'Видеоҳо'}</h2>${!query && isHome ? '<p>Файлҳои боршуда дар ҳамин браузер нигоҳ дошта мешаванд</p>' : ''}</div><button class="section-link" data-open-upload><span>＋</span> Илова кардани видео</button></div>
			${isHome ? `<div class="chips" aria-label="Филтр аз рӯи мавзӯъ">${chips.map(chip => `<button class="chip ${activeChip === chip ? 'active' : ''}" data-chip="${chip}">${labels[chip]}</button>`).join('')}</div>` : ''}
			<div class="video-grid">${videosToShow.length ? videosToShow.map(videoCard).join('') : `<div class="empty-state"><span class="empty-symbol">＋</span><strong>${emptyTitle}</strong><p>${emptyCopy}</p>${page.id !== 'liked' && page.id !== 'watch-later' && page.id !== 'history' ? '<button class="primary-button" data-open-upload>Видео интихоб кунед</button>' : ''}</div>`}</div>
		</section>
	</div>`;
}

function openUploadDialog() {
	if (!uploadCategory.options.length) uploadCategory.innerHTML = videoCategories.map(category => `<option value="${category.id}">${category.label}</option>`).join('');
	uploadDialog.showModal();
}

function watchVideo(videoId) {
	const video = userVideos.find(item => item.id === videoId);
	if (!video) return;
	const history = getStored('history').filter(id => id !== videoId);
	setStored('history', [videoId, ...history].slice(0, 50));
	document.querySelector('#playerTitle').textContent = video.title;
	document.querySelector('#playerCaption').textContent = `${categoryNames[video.category] || 'Видеоҳои ман'} · ${video.duration}`;
	const source = URL.createObjectURL(video.fileBlob);
	videoPlayer.src = source;
	playerDialog.addEventListener('close', () => {
		videoPlayer.pause();
		videoPlayer.removeAttribute('src');
		videoPlayer.load();
		URL.revokeObjectURL(source);
	}, { once: true });
	playerDialog.showModal();
	videoPlayer.play().catch(() => {});
	if (location.hash !== '#history') render({ query: searchInput.value });
}

async function loadVideoLibrary() {
	try {
		const records = await readVideoRecords();
		const valid = records.filter(record => record && record.fileBlob);
		const migratedRecords = valid.map(record => record.ownerId ? record : { ...record, ownerId: profiles[0].id });
		const recordsToMigrate = migratedRecords.filter((record, index) => !valid[index].ownerId);
		if (recordsToMigrate.length) await saveVideoRecords(recordsToMigrate);
		userVideos.push(...migratedRecords);
		render({ query: searchInput.value });
		renderProfileList();
	} catch {
		showToast('Анбори браузер дастрас нест. Сайтро тавассути Live Server кушоед.');
	}
}

buildNav();
renderProfileHeader();
render();

history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
window.addEventListener('hashchange', () => {
	activeChip = 'Ҳама';
	searchInput.value = '';
	render();
	window.scrollTo(0, 0);
});
document.querySelector('#searchForm').addEventListener('submit', event => {
	event.preventDefault();
	render({ query: searchInput.value });
});
searchInput.addEventListener('input', () => render({ query: searchInput.value }));
document.querySelector('#uploadButton').addEventListener('click', openUploadDialog);
profileButton.addEventListener('click', openProfilesDialog);
profileList.addEventListener('click', event => {
	const choice = event.target.closest('[data-profile-id]');
	if (!choice) return;
	profilesDialog.close();
	switchProfile(choice.dataset.profileId);
});
createProfileForm.addEventListener('submit', event => {
	event.preventDefault();
	const name = newProfileName.value.trim();
	if (!name) return;
	const profile = { id: `profile-${uid()}`, name, createdAt: Date.now() };
	profiles.push(profile);
	saveProfiles();
	createProfileForm.reset();
	profilesDialog.close();
	switchProfile(profile.id);
	showToast(`Китобхонаи профили «${profile.name}» сохта шуд.`);
});
document.addEventListener('click', event => {
	const pageLink = event.target.closest('[data-page]');
	if (pageLink) {
		event.preventDefault();
		location.hash = pageLink.dataset.page;
	}
	const chip = event.target.closest('[data-chip]');
	if (chip) {
		activeChip = chip.dataset.chip;
		render({ query: searchInput.value });
	}
	const saveButton = event.target.closest('[data-save]');
	if (saveButton) toggleSaved(saveButton.dataset.save, saveButton.dataset.saveList || 'later');
	const watchButton = event.target.closest('[data-watch]');
	if (watchButton) watchVideo(watchButton.dataset.watch);
});
document.addEventListener('keydown', event => {
	if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
		event.preventDefault();
		searchInput.focus();
	}
});

videoFilesInput.addEventListener('change', () => {
	const files = Array.from(videoFilesInput.files || []).filter(file => file.type.startsWith('video/'));
	selectedFiles.innerHTML = files.map(file => `<li>${escapeHtml(file.name)} <span>${(file.size / 1024 / 1024).toFixed(1)} МБ</span></li>`).join('');
	document.querySelector('#uploadStatus').textContent = files.length ? `${files.length} видео интихоб шуд` : 'MP4, WebM ё MOV · як ё чанд файл';
	confirmUpload.disabled = files.length === 0;
});

uploadForm.addEventListener('submit', async event => {
	event.preventDefault();
	const files = Array.from(videoFilesInput.files || []).filter(file => file.type.startsWith('video/'));
	if (!files.length) return;
	confirmUpload.disabled = true;
	confirmUpload.textContent = 'Видеоҳо нигоҳ дошта мешаванд…';
		try { navigator.storage?.persist?.(); } catch { }
	try {
		const records = [];
		for (const file of files) {
			const details = await readVideoDetails(file);
			const title = file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim() || file.name;
			records.push({ id: `local-${uid()}`, ownerId: activeProfile.id, title, initials: profileInitial(activeProfile.name), channel: activeProfile.name, category: uploadCategory.value, duration: details.duration, createdAt: Date.now() + records.length, poster: details.poster, fileBlob: file });
		}
		await saveVideoRecords(records);
		userVideos.unshift(...records);
		uploadDialog.close();
		uploadForm.reset();
		selectedFiles.innerHTML = '';
		document.querySelector('#uploadStatus').textContent = 'MP4, WebM ё MOV · як ё чанд файл';
		confirmUpload.textContent = 'Илова ба китобхона';
		searchInput.value = '';
		location.hash = '#my-videos';
		render();
		showToast(`${records.length} видео ба китобхона илова шуд.`);
	} catch {
		confirmUpload.disabled = false;
		confirmUpload.textContent = 'Илова ба китобхона';
		showToast('Видео нигоҳ дошта нашуд. Ҷойи холии браузерро санҷед.');
	}
});

document.addEventListener('click', event => {
	if (event.target.closest('[data-open-upload]')) openUploadDialog();
});

loadVideoLibrary();

const themeToggle = document.querySelector('#themeToggle');
const themeGlyphs = {
	light: '<path d="M20.8 13A8.5 8.5 0 0 1 11 3.2 8.6 8.6 0 1 0 20.8 13Z"/>',
	dark: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>'
};

function applyTheme(theme) {
	const isDark = theme === 'dark';
	document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
	themeToggle.setAttribute('aria-pressed', String(isDark));
	themeToggle.setAttribute('aria-label', isDark ? 'Гузаштан ба режими рӯз' : 'Гузаштан ба режими шаб');
	themeToggle.title = isDark ? 'Режими рӯз' : 'Режими шаб';
	themeToggle.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${themeGlyphs[isDark ? 'dark' : 'light']}</svg>`;
}

let savedTheme = 'light';
try { savedTheme = localStorage.getItem('vida-theme') === 'dark' ? 'dark' : 'light'; }
catch { savedTheme = 'light'; }
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
	const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
	applyTheme(nextTheme);
	try { localStorage.setItem('vida-theme', nextTheme); }
	catch { showToast('Интихоби режим дар ин браузер нигоҳ дошта намешавад.'); }
});

document.querySelectorAll('[data-close-dialog]').forEach(button => {
	button.addEventListener('click', event => {
		event.preventDefault();
		button.closest('dialog')?.close();
	});
});

document.querySelectorAll('dialog.app-dialog').forEach(dialog => {
	dialog.addEventListener('click', event => {
		if (event.target === dialog) dialog.close();
	});
});
// Агар формати видео дар ин телефон напазад, паём нишон медиҳем
videoPlayer.addEventListener('error', () => {
	if (videoPlayer.getAttribute('src')) showToast('Ин формат дар ин телефон намеравад. Видеоро бо формати MP4 (H.264) илова кунед.');
});
