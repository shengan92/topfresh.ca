const LANGUAGE_KEY = 'topFreshLanguage';
const languageModal = document.getElementById('language-modal');
const languageToggle = document.getElementById('language-toggle');
let currentLanguage = 'en';

const translations = {
  en: {
    title: 'Top Fresh Market | Asian Grocery in Halifax', description: 'Top Fresh Market - fresh Asian groceries, produce, seafood, snacks, and pantry favourites in Halifax.',
    navLabel: 'Main navigation', nav: ['Departments', 'Visit us', 'Call store'], eyebrow: 'Your neighbourhood Asian grocer',
    heroTitle: 'Fresh finds.<br><span>Flavours from home.</span>', heroText: 'Discover crisp produce, live seafood, pantry staples, and the snacks you love—all under one roof.',
    heroActions: ['Plan your visit', 'Explore the store'], locationNote: 'Visit us at 1 Flamingo Drive, Halifax', carouselLabel: 'Top Fresh Market highlights', previous: 'Previous image', next: 'Next image', pause: 'Pause slideshow', play: 'Play slideshow', chooseSlide: 'Choose a slide', showImage: 'Show image',
    slides: [['Welcome to Top Fresh', 'Your local market for everyday favourites'], ['Fresh produce, every day', 'Familiar favourites and exciting finds'], ['A pantry full of possibilities', 'Snacks, noodles, sauces, and more'], ['Seafood worth sharing', 'Fresh choices for the family table'], ['Taste something new', 'Seasonal fruit from around the world'], ['Great value, close to home', 'Fresh specials for your weekly shop']],
    imageAlts: ['The front entrance of Top Fresh Market', 'A colourful selection of fresh fruit', 'Shelves stocked with Asian snacks and pantry foods', 'Fresh cooked crabs on display', 'Fresh purple mangosteens', 'Fresh tomatoes on sale'],
    shop: 'Shop the market', departmentsTitle: 'Good food starts here', departmentsIntro: 'Quality ingredients for quick weeknight meals, family celebrations, and everything between.',
    departments: [['Fresh produce', 'Seasonal greens, tropical fruit, and everyday essentials.'], ['Seafood & meat', 'Fresh selections prepared for your favourite recipes.'], ['Pantry staples', 'Rice, noodles, sauces, spices, and hard-to-find ingredients.'], ['Snacks & drinks', 'Sweet, savoury, refreshing, and always fun to discover.']],
    hello: 'Come say hello', visitTitle: 'Your next fresh find<br>is just around the corner.', location: 'Location', address: '1 Flamingo Drive<br>Halifax, Nova Scotia', questions: 'Questions?', contact: 'Contact us', footer: 'Fresh food. Friendly faces. Local heart.',
    switchLabel: 'Switch to Mandarin Chinese', switchText: '中文', status: {closed: 'Closed', opening: 'Opening soon', open: 'Open today', closing: 'Closing soon'}
  },
  zh: {
    title: 'Top Fresh Market | 哈利法克斯亚洲超市', description: 'Top Fresh Market——哈利法克斯的新鲜亚洲食品超市，供应蔬果、海鲜、零食和厨房必备品。',
    navLabel: '主导航', nav: ['商品分类', '到店购物', '致电门店'], eyebrow: '您身边的亚洲超市',
    heroTitle: '新鲜好物，<br><span>家乡味道。</span>', heroText: '新鲜蔬果、鲜活海产、厨房必备和心爱零食，一站购齐。',
    heroActions: ['计划到店', '探索门店'], locationNote: '地址：哈利法克斯 Flamingo Drive 1号', carouselLabel: 'Top Fresh Market 精选展示', previous: '上一张图片', next: '下一张图片', pause: '暂停轮播', play: '播放轮播', chooseSlide: '选择幻灯片', showImage: '显示图片',
    slides: [['欢迎来到 Top Fresh', '您身边的超市，满足日常所需'], ['每日新鲜蔬果', '熟悉的美味与新奇的发现'], ['琳琅满目的厨房食材', '零食、面条、酱料，应有尽有'], ['值得分享的鲜美海产', '为家庭餐桌精选的新鲜食材'], ['尝试一种新味道', '来自世界各地的时令水果'], ['实惠价格，就在身边', '每周新鲜特价精选']],
    imageAlts: ['Top Fresh Market 正门', '色彩丰富的新鲜水果', '摆满亚洲零食和厨房食品的货架', '陈列的新鲜熟蟹', '新鲜的紫色山竹', '特价新鲜番茄'],
    shop: '选购全店好物', departmentsTitle: '美好滋味，从这里开始', departmentsIntro: '无论是工作日晚餐、家庭聚会，还是日常饮食，都能找到优质食材。',
    departments: [['新鲜蔬果', '时令绿叶菜、热带水果和每日必备。'], ['海鲜与肉类', '为您喜爱的食谱准备新鲜食材。'], ['厨房必备', '米、面、酱料、香料及特色食材。'], ['零食与饮品', '甜的、咸的、清爽的，每次都有新发现。']],
    hello: '欢迎光临', visitTitle: '下一份新鲜好物，<br>就在街角等您。', location: '地址', address: 'Flamingo Drive 1号<br>哈利法克斯，新斯科舍省', questions: '有疑问？', contact: '联系我们', footer: '新鲜食物，亲切笑脸，本地情怀。',
    switchLabel: '切换为英文', switchText: 'English', status: {closed: '已打烊', opening: '即将开门', open: '今日营业中', closing: '即将打烊'}
  }
};

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function applyLanguage(language, remember = true) {
  currentLanguage = language === 'zh' ? 'zh' : 'en';
  const copy = translations[currentLanguage];
  document.documentElement.lang = currentLanguage === 'zh' ? 'zh-Hans' : 'en';
  document.title = copy.title;
  document.querySelector('meta[name="description"]').content = copy.description;
  document.querySelector('nav').setAttribute('aria-label', copy.navLabel);
  document.querySelectorAll('.site-header nav a').forEach((link, index) => { link.textContent = copy.nav[index]; });
  setText('.hero-copy .eyebrow', copy.eyebrow);
  document.getElementById('hero-title').innerHTML = copy.heroTitle;
  setText('.hero-copy > p', copy.heroText);
  document.querySelectorAll('.hero-actions a').forEach((link, index) => { link.textContent = copy.heroActions[index]; });
  setText('.status-location', copy.locationNote);
  carousel.setAttribute('aria-label', copy.carouselLabel);
  document.querySelector('.previous').setAttribute('aria-label', copy.previous);
  document.querySelector('.next').setAttribute('aria-label', copy.next);
  document.querySelector('.dots').setAttribute('aria-label', copy.chooseSlide);
  slides.forEach((slide, index) => {
    slide.querySelector('img').alt = copy.imageAlts[index];
    slide.querySelector('strong').textContent = copy.slides[index][0];
    slide.querySelector('figcaption span').textContent = copy.slides[index][1];
  });
  dots.forEach((dot, index) => dot.setAttribute('aria-label', `${copy.showImage} ${index + 1}`));
  setText('.departments .eyebrow', copy.shop);
  setText('#departments-title', copy.departmentsTitle);
  setText('.section-heading > p', copy.departmentsIntro);
  document.querySelectorAll('.department-grid article').forEach((card, index) => {
    card.querySelector('h3').textContent = copy.departments[index][0];
    card.querySelector('p').textContent = copy.departments[index][1];
  });
  setText('.visit .eyebrow', copy.hello);
  document.getElementById('visit-title').innerHTML = copy.visitTitle;
  setText('.visit-details p:first-child > span', copy.location);
  document.querySelector('.visit-details p:first-child strong').innerHTML = copy.address;
  setText('.visit-details p:nth-child(2) > span', copy.questions);
  setText('.visit-details .button', copy.contact);
  setText('footer > p:first-of-type', copy.footer);
  languageToggle.textContent = copy.switchText;
  languageToggle.setAttribute('aria-label', copy.switchLabel);
  pauseButton.setAttribute('aria-label', isPaused ? copy.play : copy.pause);
  if (remember) localStorage.setItem(LANGUAGE_KEY, currentLanguage);
  updateStoreStatus();
}

const slides = [...document.querySelectorAll('.slide')];
const dotsContainer = document.querySelector('.dots');
const pauseButton = document.querySelector('.pause-button');
const carousel = document.querySelector('.carousel');
let currentSlide = 0;
let isPaused = false;
let timer;

const dots = slides.map((_, index) => {
  const dot = document.createElement('button');
  dot.className = 'dot';
  dot.type = 'button';
  dot.setAttribute('aria-label', `Show image ${index + 1}`);
  dot.addEventListener('click', () => showSlide(index, true));
  dotsContainer.append(dot);
  return dot;
});

function showSlide(index, restart = false) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    const active = slideIndex === currentSlide;
    slide.classList.toggle('active', active);
    slide.setAttribute('aria-hidden', String(!active));
    dots[slideIndex].classList.toggle('active', active);
    dots[slideIndex].setAttribute('aria-current', active ? 'true' : 'false');
  });
  if (restart) startTimer();
}

function startTimer() {
  clearInterval(timer);
  if (!isPaused && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    timer = setInterval(() => showSlide(currentSlide + 1), 5000);
  }
}

document.querySelector('.previous').addEventListener('click', () => showSlide(currentSlide - 1, true));
document.querySelector('.next').addEventListener('click', () => showSlide(currentSlide + 1, true));

pauseButton.addEventListener('click', () => {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? '?' : '?';
  pauseButton.setAttribute('aria-label', isPaused ? translations[currentLanguage].play : translations[currentLanguage].pause);
  startTimer();
});

carousel.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') showSlide(currentSlide - 1, true);
  if (event.key === 'ArrowRight') showSlide(currentSlide + 1, true);
});

document.getElementById('year').textContent = new Date().getFullYear();

const storeStatus = document.getElementById('store-status');
const storeTimeFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Halifax',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23'
});

function updateStoreStatus() {
  const timeParts = storeTimeFormatter.formatToParts(new Date());
  const hour = Number(timeParts.find(part => part.type === 'hour').value);
  const minute = Number(timeParts.find(part => part.type === 'minute').value);
  const minutesSinceMidnight = hour * 60 + minute;
  let label = translations[currentLanguage].status.closed;
  let state = 'closed';

  if (minutesSinceMidnight >= 8 * 60 && minutesSinceMidnight < 9 * 60) {
    label = translations[currentLanguage].status.opening;
    state = 'soon';
  } else if (minutesSinceMidnight >= 9 * 60 && minutesSinceMidnight < 19 * 60) {
    label = translations[currentLanguage].status.open;
    state = 'open';
  } else if (minutesSinceMidnight >= 19 * 60 && minutesSinceMidnight < 20 * 60) {
    label = translations[currentLanguage].status.closing;
    state = 'soon';
  }

  storeStatus.querySelector('strong').textContent = label;
  storeStatus.dataset.state = state;
}

updateStoreStatus();
setInterval(updateStoreStatus, 60 * 1000);
showSlide(0);
startTimer();

languageToggle.addEventListener('click', () => applyLanguage(currentLanguage === 'en' ? 'zh' : 'en'));

document.querySelectorAll('[data-language]').forEach(button => {
  button.addEventListener('click', () => {
    applyLanguage(button.dataset.language);
    languageModal.hidden = true;
    document.body.style.overflow = '';
    languageToggle.focus();
  });
});

const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
if (savedLanguage === 'en' || savedLanguage === 'zh') {
  applyLanguage(savedLanguage, false);
} else {
  applyLanguage('en', false);
  languageModal.hidden = false;
  document.body.style.overflow = 'hidden';
  document.querySelector('[data-language="en"]').focus();
}
