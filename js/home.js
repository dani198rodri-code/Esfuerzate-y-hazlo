/* ============ DATOS DE LOS LIBROS (books data model) ============ */
const books = [
  {
    title: "Esfuérzate y Hazlo",
    subtitle: "El camino del crecimiento personal",
    author: "Daniel Rodríguez Goitia",
    image: "img/esfuerzate.jpg",
    price: "S/ 29",
    oldPrice: "S/ 59",
    button: "Consigo mi ejemplar",
    rating: "★★★★★ 4.9 (312 lectores)",
    badge: "Edición original",
    desc: "El libro que da nombre a esta colección: una guía para dejar de posponerte y empezar a subir tu propia montaña, un paso a la vez.",
    page: "libro-esfuerzate.html"
  },
  {
    title: "El Camino Metódico hacia la Libertad Financiera",
    subtitle: "De la mentalidad correcta a la independencia económica: 10 pasos probados",
    author: "Daniel Rodríguez Goitia",
    image: "img/camino-pack.png",
    price: "S/ 39",
    oldPrice: "S/ 69",
    button: "Quiero el método completo",
    rating: "★★★★★ 4.8 (204 lectores)",
    badge: "Incluye cuaderno de trabajo",
    desc: "Diez pasos probados para pasar de la mentalidad de escasez a la independencia económica, con cuaderno de ejercicios incluido.",
    page: "libro-camino-metodico.html"
  },
  {
    title: "Cómo Somos Nosotros",
    subtitle: "El poder de tus creencias para transformar tu realidad",
    author: "Daniel Rodríguez Goitia",
    image: "img/como-somos-nosotros.jpg",
    price: "S/ 25",
    oldPrice: "S/ 49",
    button: "Quiero transformar mis creencias",
    rating: "★★★★★ 4.9 (268 lectores)",
    badge: "Cuaderno de trabajo",
    desc: "Ejercicios prácticos de psicología cognitiva para identificar y transformar las creencias que sostienen tu realidad actual.",
    page: "libro-como-somos-nosotros.html"
  },
  {
    title: "Ha·Bra·Ka·Dabra",
    subtitle: "El verbo que crea mundos: secretos cabalísticos del lenguaje sagrado",
    author: "Daniel Rodríguez Goitia",
    image: "img/habrakadabra.png",
    price: "S/ 27",
    oldPrice: "S/ 52",
    button: "Quiero descubrir el verbo",
    rating: "★★★★★ 4.9 (156 lectores)",
    badge: "Espiritualidad",
    desc: "Diez llaves cabalísticas para entender el poder creador de la palabra y practicar, un minuto al día, tu propia voz consciente.",
    page: "habrakadabra.html"
  },
  {
    title: "El Tiempo como Aliado",
    subtitle: "Guía profesional de bienestar: descansar, alimentar, mover",
    author: "Esfuérzate y Hazlo",
    image: "img/guia-tiempo-aliado.png",
    price: "S/ 19",
    oldPrice: "S/ 35",
    button: "Quiero organizar mi tiempo",
    rating: "★★★★★ 4.8 (98 lectores)",
    badge: "Guía de bienestar",
    desc: "Un método claro y estructurado para organizar tu día y proteger tu salud física y mental, empezando por un solo cambio a la vez.",
    page: "guiadebienestar.html"
  },
  {
    title: "Guía Integral de Entrenamiento y Nutrición",
    subtitle: "3 guías en 1: mañana, tarde y noche",
    author: "Esfuérzate y Hazlo",
    image: "img/guia-entrenamiento-nutricion.png",
    price: "S/ 45",
    oldPrice: "S/ 89",
    button: "Quiero mi plan completo",
    rating: "★★★★★ 4.9 (87 lectores)",
    badge: "3 guías en 1",
    desc: "Estrategia de alimentación para cada horario de entreno: mañana, tarde o noche. Nutrición, energía y recuperación en un solo paquete.",
    page: "guia-integral-entrenamiento-nutricion.html"
  }
];

/* ============ HERO SLIDER ============ */
const stage = document.getElementById('bookStage');
const indicatorsEl = document.getElementById('indicators');
const heroPrice = document.getElementById('heroPrice');
const heroPriceOld = document.getElementById('heroPriceOld');
const heroBtn = document.getElementById('heroBtn');
const heroBg = document.getElementById('heroBg');

let current = 0;
let sliderInterval;

books.forEach((b, i) => {
  const card = document.createElement('div');
  card.className = 'book-card' + (i === 0 ? ' active' : '');
  card.innerHTML = `
    <a href="${b.page}" class="book-cover">
      <img src="${b.image}" alt="Portada de ${b.title}">
    </a>
    <div class="book-title">
      <h3>${b.title}</h3>
      <span>${b.subtitle}</span>
    </div>
    <div class="rating">${b.rating}</div>
  `;
  stage.appendChild(card);

  const dot = document.createElement('button');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goTo(i));
  indicatorsEl.appendChild(dot);
});

const cards = stage.querySelectorAll('.book-card');
const dots = indicatorsEl.querySelectorAll('button');

function render(i){
  cards.forEach((c, idx) => c.classList.toggle('active', idx === i));
  dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
  const b = books[i];
  heroPrice.textContent = b.price;
  heroPriceOld.textContent = b.oldPrice;
  heroBtn.textContent = b.button;
  heroBtn.setAttribute('href', b.page);
  heroBg.style.background = i % 2 === 0
    ? 'radial-gradient(ellipse 80% 60% at 70% 15%, rgba(212,162,78,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 15% 85%, rgba(126,155,118,0.16), transparent 60%), #181a26'
    : 'radial-gradient(ellipse 80% 60% at 30% 10%, rgba(126,155,118,0.18), transparent 60%), radial-gradient(ellipse 60% 55% at 85% 90%, rgba(163,97,122,0.16), transparent 60%), #181a26';
  resetCountdown();
}

function goTo(i){
  current = i;
  render(current);
  restartSlider();
}

function nextSlide(){
  current = (current + 1) % books.length;
  render(current);
}

function restartSlider(){
  clearInterval(sliderInterval);
  sliderInterval = setInterval(nextSlide, 8000); // cambio automático cada 8s
}
restartSlider();

/* ============ CONTADOR DE OFERTA ============ */
let countdownTarget;
function resetCountdown(){
  countdownTarget = Date.now() + 1000 * 60 * 45; // 45 min por libro mostrado
}
resetCountdown();

function tickCountdown(){
  const diff = Math.max(0, countdownTarget - Date.now());
  const h = String(Math.floor(diff / 3600000)).padStart(2,'0');
  const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0');
  const s = String(Math.floor((diff % 60000) / 1000)).padStart(2,'0');
  document.getElementById('cd-h').textContent = h;
  document.getElementById('cd-m').textContent = m;
  document.getElementById('cd-s').textContent = s;
}
setInterval(tickCountdown, 1000);
tickCountdown();

/* ============ PRODUCTOS GRID ============ */
const grid = document.getElementById('productGrid');
books.forEach(b => {
  const card = document.createElement('div');
  card.className = 'prod-card';
  card.innerHTML = `
    <a href="${b.page}" class="prod-cover">
      <img src="${b.image}" alt="Portada de ${b.title}">
      <span class="prod-badge">${b.badge}</span>
    </a>
    <div class="prod-body">
      <h3>${b.title}</h3>
      <p>${b.desc}</p>
      <div class="prod-foot">
        <span class="prod-price">${b.price}</span>
        <a href="${b.page}" class="btn btn-ghost" style="padding:9px 18px; font-size:13px;">Ver libro</a>
      </div>
    </div>
  `;
  grid.appendChild(card);
});

/* ============ FAQ ACORDEÓN ============ */
buildFAQ([
  { q: "¿En qué formato recibo los libros?", a: "Recibes cada libro en PDF y ePub por correo electrónico, de forma inmediata tras tu compra, listo para leer en cualquier dispositivo." },
  { q: "¿Necesito experiencia previa en desarrollo personal?", a: "No. Los libros están escritos para cualquier persona dispuesta a actuar, sin importar si es la primera vez que exploras estos temas." },
  { q: "¿Puedo comprar más de un libro con descuento?", a: "Sí, al llevar la colección completa obtienes un precio especial que se muestra automáticamente en el checkout." },
  { q: "¿Qué pasa si no me gusta el libro?", a: "Cuentas con 7 días de garantía. Si sientes que no te aportó valor, te devolvemos el 100% de tu pago." },
  { q: "¿Cómo se relaciona esto con el canal Esfuérzate y Hazlo?", a: "Los libros profundizan en los temas que compartimos en el canal, con ejercicios y estructura que el formato video no permite." }
], 'faqList');

/* Render inicial precios hero */
render(0);
