// =====================================================
// main.js — Венера: услуги, цены, галерея, отзывы. Запись - в YClients салона
// =====================================================

const BOOKING_URL = 'http://n1327360.yclients.com';

// ---------- Данные (только реальные: YClients, 2ГИС) ----------
const SERVICES = [
  { id: 'manicure', title: 'Маникюр', short: 'Покрытие, подбор цвета и дизайна', img: 'img/manicure.jpg', time: 'Мастера: Галина, Виктория, Екатерина',
    text: 'Маникюр с покрытием, подбор цвета и втирки. Цену и время мастер подскажет при записи.',
    list: ['покрытие на выбор', 'подбор цвета и втирки', 'дизайн по желанию'] },
  { id: 'pedicure', title: 'Педикюр', short: 'Ухоженные стопы и аккуратное покрытие', img: 'img/pedicure.jpg', time: 'Мастер: Екатерина',
    text: 'Педикюр в спокойной обстановке, без спешки. Цену уточняйте при записи.',
    list: ['обработка стоп и пальцев', 'покрытие по желанию'] },
  { id: 'brows', title: 'Брови', short: 'Коррекция, окрашивание, ламинирование', price: 500, from: true, img: 'img/brows.jpg', time: 'от 500 ₽',
    text: 'Коррекция и окрашивание, ламинирование и осветление бровей.',
    list: ['коррекция + окрашивание - 1 400 ₽', 'ламинирование - 1 400 ₽', 'ламинирование + окрашивание - 1 600 ₽', 'осветление - 1 200 ₽'] },
  { id: 'lashes', title: 'Ресницы', short: 'Ламинирование и окрашивание', price: 500, from: true, img: 'img/lashes.jpg', time: 'от 500 ₽',
    text: 'Ламинирование и окрашивание верхних и нижних ресниц.',
    list: ['окрашивание - 500 ₽', 'ламинирование нижних - 1 000 ₽', 'ламинирование - 1 600 ₽', 'ламинирование + окрашивание - 1 700 ₽'] },
  { id: 'makeup', title: 'Макияж', short: 'Анастасия - макияж любой сложности', img: 'img/makeup.jpg', time: 'Мастер: Анастасия',
    text: 'Анастасия делает макияж любой сложности, в том числе на фотосессию. Цену уточняйте при записи.',
    list: ['дневной и вечерний', 'на фотосессию и праздник'] }
];

// Цены с YClients салона
const PRICES = {
  'Брови': [
    ['Коррекция + окрашивание', '1 час', 1400],
    ['Ламинирование бровей', '', 1400],
    ['Ламинирование + окрашивание', '', 1600],
    ['Осветление бровей', '', 1200],
    ['Окрашивание без коррекции', '', 500],
    ['Коррекция без окрашивания', '', 500],
    ['Удаление усиков / волосков', '', 300]
  ],
  'Ресницы': [
    ['Ламинирование + окрашивание', '1 час', 1700],
    ['Ламинирование ресниц', '40 минут', 1600],
    ['Ламинирование нижних ресниц', '40 минут', 1000],
    ['Окрашивание ресниц', '25 минут', 500]
  ]
};

// Идеи маникюра (временные фото - заменить на работы салона)
const GALLERY = [
  { img: 'img/g1.jpg', cat: 'Дизайн', cap: 'Мраморный френч' },
  { img: 'img/g2.jpg', cat: 'Френч', cap: 'Френч с блёстками' },
  { img: 'img/g3.jpg', cat: 'Яркие', cap: 'Синий миндаль с серебром' },
  { img: 'img/g4.jpg', cat: 'Яркие', cap: 'Классический красный' },
  { img: 'img/g5.jpg', cat: 'Дизайн', cap: 'Металлик и стразы' },
  { img: 'img/g6.jpg', cat: 'Нюд', cap: 'Нюдовый с цветами' },
  { img: 'img/g7.jpg', cat: 'Нюд', cap: 'Нежно-розовый' },
  { img: 'img/g8.jpg', cat: 'Френч', cap: 'Тонкий френч' },
  { img: 'img/g9.jpg', cat: 'Яркие', cap: 'Сочный дизайн' }
];

// Настоящие отзывы из 2ГИС
const REVIEWS = [
  { name: 'Алла', text: 'Очень хороший салон в центре города. Адекватные цены, приятные девочки. Очень понравилась мастер Екатерина, делала у нее педикюр, а потом пришла и на маникюр. Все аккуратно, чисто, быстро. Очень рада, что нашла своего мастера.' },
  { name: 'Анастасия', text: 'Очень приятное впечатление от визита: мастер Галина очень доброжелательная, не торопила, помогла подобрать втирку и цвет. Время пролетело незаметно, было комфортно и спокойно.' },
  { name: 'Мария', text: 'Я в восторге с посещения салона, все очень понравилось, ногти сделали аккуратно и быстро, рекомендую.' },
  { name: 'Олеся', text: 'Виктория, спасибо вам за маникюр! Быстро, профессионально! Маникюр супер, я очень довольна.' },
  { name: 'Vlada', text: 'Спасибо большое Анастасии за прекрасный макияж на фотосессию! Я в восторге! Буду обращаться еще!' }
];

// ---------- Помощники ----------
const $ = (s) => document.querySelector(s);
const rub = (n) => n.toLocaleString('ru-RU') + ' ₽';

function el(tag, attrs = {}, html = '') {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  node.innerHTML = html;
  return node;
}

// ---------- Запись: сразу в YClients салона ----------
function openBooking() { window.open(BOOKING_URL, '_blank', 'noopener'); }
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-book]');
  if (!t) return;
  e.preventDefault();
  document.body.classList.remove('menu-open');
  openBooking();
});

// ---------- Шапка и меню ----------
const header = $('#header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 10), { passive: true });
$('#burger').addEventListener('click', () => document.body.classList.toggle('menu-open'));
document.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', () => document.body.classList.remove('menu-open')));

const sections = ['top', 'services', 'prices', 'gallery', 'reviews', 'contacts'].map((id) => document.getElementById(id));
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    document.querySelectorAll('.nav a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach((s) => s && navObserver.observe(s));

// ---------- Услуги ----------
const servicesList = $('#services-list');
const footerServices = $('#footer-services');
SERVICES.forEach((s) => {
  const price = s.price ? (s.from ? 'от ' : '') + rub(s.price) : 'цена при записи';
  const card = el('button', { class: 'service', type: 'button' },
    `<img src="${s.img}" alt="${s.title}" loading="lazy"><div class="service__body"><b>${s.title}</b><p>${s.short}</p><span class="price">${price}</span></div>`);
  card.addEventListener('click', () => openService(s.id));
  servicesList.append(card);

  const link = el('button', { type: 'button' }, s.title);
  link.addEventListener('click', () => openService(s.id));
  footerServices.append(link);
});

// ---------- Окна ----------
function openModal(m) { m.classList.add('open'); m.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
function closeModal(m) { m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); if (!document.querySelector('.modal.open, .lightbox.open')) document.body.style.overflow = ''; }

document.querySelectorAll('.modal, .lightbox').forEach((m) => {
  m.addEventListener('click', (e) => { if (e.target === m || e.target.closest('[data-close]')) closeModal(m); });
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') document.querySelectorAll('.modal.open, .lightbox.open').forEach(closeModal);
  if ($('#lightbox').classList.contains('open')) {
    if (e.key === 'ArrowRight') stepLightbox(1);
    if (e.key === 'ArrowLeft') stepLightbox(-1);
  }
});

const serviceModal = $('#service-modal');
function openService(id) {
  const s = SERVICES.find((x) => x.id === id);
  $('#sm-img').src = s.img;
  $('#sm-img').alt = s.title;
  $('#sm-time').textContent = s.time;
  $('#sm-title').textContent = s.title;
  $('#sm-text').textContent = s.text;
  $('#sm-list').innerHTML = s.list.map((x) => `<li>${x}</li>`).join('');
  $('#sm-price').textContent = s.price ? (s.from ? 'от ' : '') + rub(s.price) : '';
  openModal(serviceModal);
}
$('#sm-book').addEventListener('click', () => { closeModal(serviceModal); openBooking(); });

// ---------- Цены ----------
const priceTabs = $('#price-tabs');
const priceList = $('#price-list');
function renderPrices(cat) {
  priceTabs.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.cat === cat));
  priceList.innerHTML = '';
  PRICES[cat].forEach(([name, note, price]) => {
    const row = el('button', { class: 'price-row', type: 'button' },
      `<span><b>${name}</b>${note ? `<small>${note}</small>` : ''}</span><span class="p">${rub(price)}</span><span class="go">→</span>`);
    row.addEventListener('click', openBooking);
    priceList.append(row);
  });
}
Object.keys(PRICES).forEach((cat) => {
  const t = el('button', { class: 'tab', type: 'button', 'data-cat': cat }, cat);
  t.addEventListener('click', () => renderPrices(cat));
  priceTabs.append(t);
});
renderPrices(Object.keys(PRICES)[0]);

// ---------- Галерея ----------
const galleryTabs = $('#gallery-tabs');
const galleryList = $('#gallery-list');
let visible = GALLERY.map((_, i) => i);
GALLERY.forEach((g, i) => {
  const shot = el('button', { class: 'shot', type: 'button', 'data-cat': g.cat }, `<img src="${g.img}" alt="${g.cap}" loading="lazy"><span>${g.cap}</span>`);
  shot.addEventListener('click', () => openLightbox(i));
  galleryList.append(shot);
});
['Все', 'Нюд', 'Френч', 'Яркие', 'Дизайн'].forEach((cat, i) => {
  const t = el('button', { class: 'tab' + (i === 0 ? ' active' : ''), type: 'button' }, cat);
  t.addEventListener('click', () => {
    galleryTabs.querySelectorAll('.tab').forEach((x) => x.classList.toggle('active', x === t));
    visible = [];
    galleryList.querySelectorAll('.shot').forEach((s, idx) => {
      const show = cat === 'Все' || s.dataset.cat === cat;
      s.classList.toggle('hide', !show);
      if (show) visible.push(idx);
    });
  });
  galleryTabs.append(t);
});

const lightbox = $('#lightbox');
let lbPos = 0;
let lbItems = GALLERY;
function showLightbox() {
  const g = lbItems[lbPos];
  $('#lb-img').src = g.img;
  $('#lb-img').alt = g.cap;
  $('#lb-cap').textContent = g.cap;
}
function openLightbox(i) { lbItems = visible.map((v) => GALLERY[v]); lbPos = Math.max(0, visible.indexOf(i)); showLightbox(); openModal(lightbox); }
function stepLightbox(d) { lbPos = (lbPos + d + lbItems.length) % lbItems.length; showLightbox(); }
$('#lb-prev').addEventListener('click', () => stepLightbox(-1));
$('#lb-next').addEventListener('click', () => stepLightbox(1));

// ---------- Отзывы ----------
let revStart = 0;
function renderReviews() {
  const per = window.innerWidth < 760 ? 1 : 3;
  const list = $('#reviews-list');
  list.innerHTML = '';
  for (let k = 0; k < per; k++) {
    const r = REVIEWS[(revStart + k) % REVIEWS.length];
    list.append(el('article', { class: 'review' },
      `<span class="stars">★★★★★</span><q>${r.text}</q><div class="review__who"><span class="ava">${r.name[0]}</span><span><b>${r.name}</b><small>2ГИС</small></span></div>`));
  }
}
$('#rev-prev').addEventListener('click', () => { revStart = (revStart - 1 + REVIEWS.length) % REVIEWS.length; renderReviews(); });
$('#rev-next').addEventListener('click', () => { revStart = (revStart + 1) % REVIEWS.length; renderReviews(); });
window.addEventListener('resize', renderReviews);
renderReviews();
