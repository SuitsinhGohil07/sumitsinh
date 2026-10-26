// Typing effect
const words = ['clean websites.', 'lead pipelines.', 'brands that get noticed.', 'things that work.'];
const typed = document.getElementById('typed');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let w = 0, c = 0, del = false;
function type() {
  const word = words[w];
  typed.textContent = word.slice(0, c);
  if (!del && c < word.length) { c++; setTimeout(type, 85); }
  else if (!del) { del = true; setTimeout(type, 1500); }
  else if (c > 0) { c--; setTimeout(type, 45); }
  else { del = false; w = (w + 1) % words.length; setTimeout(type, 300); }
}
if (reduce) typed.textContent = words[0]; else type();

// Photo editor sliders
const photo = document.getElementById('photo');
const ids = ['bright', 'contrast', 'sat', 'warm'];
const els = Object.fromEntries(ids.map(i => [i, document.getElementById(i)]));
function applyFilter() {
  photo.style.filter =
    `brightness(${els.bright.value}%) contrast(${els.contrast.value}%) saturate(${els.sat.value}%) sepia(${els.warm.value}%)`;
}
ids.forEach(i => els[i].addEventListener('input', applyFilter));
document.getElementById('reset').addEventListener('click', () => {
  els.bright.value = 100; els.contrast.value = 100; els.sat.value = 100; els.warm.value = 0;
  applyFilter();
});

// Skill bars with tabs
const skills = {
  code: [['HTML, CSS, JavaScript', 80], ['Python', 65], ['Java', 60], ['MS Office', 85]],
  market: [['Lead generation', 80], ['Digital marketing', 75], ['Sales support', 78], ['Customer relationships', 75]],
  people: [['Communication', 90], ['Leadership', 75], ['Fast typing', 90], ['Languages (EN, HI, GU)', 95]]
};
const bars = document.getElementById('bars');
function showBars(key) {
  bars.innerHTML = skills[key].map(([n, v]) =>
    `<div class="bar"><div class="top"><span>${n}</span><span>${v}%</span></div><div class="track"><div class="fill" data-v="${v}"></div></div></div>`
  ).join('');
  requestAnimationFrame(() => requestAnimationFrame(() =>
    bars.querySelectorAll('.fill').forEach(f => f.style.width = f.dataset.v + '%')));
}
document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach(x => x.classList.remove('on'));
  t.classList.add('on');
  showBars(t.dataset.t);
}));
showBars('code');

// Count-up stats when visible
const counters = document.querySelectorAll('[data-n]');
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  io.unobserve(e.target);
  const el = e.target, end = +el.dataset.n, d = +el.dataset.d, t0 = performance.now();
  (function tick(t) {
    const p = Math.min((t - t0) / 1200, 1);
    el.textContent = (end * (1 - Math.pow(1 - p, 3))).toFixed(d);
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}), { threshold: .6 });
counters.forEach(c => io.observe(c));

// Scroll progress bar
const prog = document.getElementById('progress');
addEventListener('scroll', () => {
  const h = document.documentElement;
  prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
}, { passive: true });

// 3D tilt on service cards
if (!reduce) document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

// Contact form opens the visitor's email app with the message filled in
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('fname').value;
  const mail = document.getElementById('fmail').value;
  const msg = document.getElementById('fmsg').value;
  const body = encodeURIComponent(`${msg}\n\nFrom: ${name} (${mail})`);
  location.href = `mailto:gohilsumitsinhsanjubhai26@gmail.com?subject=${encodeURIComponent('Project enquiry from ' + name)}&body=${body}`;
});
