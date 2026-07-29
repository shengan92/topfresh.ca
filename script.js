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
  pauseButton.setAttribute('aria-label', isPaused ? 'Play slideshow' : 'Pause slideshow');
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
  let label = 'Closed';
  let state = 'closed';

  if (minutesSinceMidnight >= 8 * 60 && minutesSinceMidnight < 9 * 60) {
    label = 'Opening soon';
    state = 'soon';
  } else if (minutesSinceMidnight >= 9 * 60 && minutesSinceMidnight < 19 * 60) {
    label = 'Open today';
    state = 'open';
  } else if (minutesSinceMidnight >= 19 * 60 && minutesSinceMidnight < 20 * 60) {
    label = 'Closing soon';
    state = 'soon';
  }

  storeStatus.querySelector('strong').textContent = label;
  storeStatus.dataset.state = state;
}

updateStoreStatus();
setInterval(updateStoreStatus, 60 * 1000);
showSlide(0);
startTimer();
