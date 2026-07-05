/* ============ SPLASH DE BIENVENIDA ============ */
const splash = document.getElementById('splash');
if (splash){
  window.addEventListener('load', () => {
    setTimeout(() => splash.classList.add('hide'), 1400);
  });
  // Salvaguarda: si algo tarda en cargar, no bloquear la web más de 3.5s
  setTimeout(() => splash.classList.add('hide'), 3500);
}

/* ============ MENÚ HAMBURGUESA (MÓVIL) ============ */
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');

function closeMobileNav(){
  if (!navToggle || !mobileNav) return;
  navToggle.classList.remove('open');
  mobileNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
function toggleMobileNav(){
  const isOpen = mobileNav.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
}
if (navToggle && mobileNav){
  navToggle.addEventListener('click', toggleMobileNav);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));
}

/* ============ HEADER SCROLL ============ */
const header = document.getElementById('header');
if (header){
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });
}

/* ============ FAQ ACORDEÓN (reutilizable) ============ */
function buildFAQ(faqs, containerId){
  const faqList = document.getElementById(containerId);
  if (!faqList) return;
  faqs.forEach(item => {
    const el = document.createElement('div');
    el.className = 'faq-item';
    el.innerHTML = `
      <div class="faq-q"><span>${item.q}</span><span class="plus">+</span></div>
      <div class="faq-a"><p>${item.a}</p></div>
    `;
    const q = el.querySelector('.faq-q');
    const a = el.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = el.classList.contains('open');
      faqList.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen){
        el.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
    faqList.appendChild(el);
  });
}

/* ============ SCROLL REVEAL ============ */
function initReveal(){
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
}

/* ============ AÑO FOOTER ============ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

initReveal();
