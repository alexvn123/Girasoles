// Círculo que sigue al toque o ratón
const touchCircle = document.getElementById('touch-circle');

function updateCircle(x, y) {
  touchCircle.style.left = (x - 20) + 'px';
  touchCircle.style.top = (y - 20) + 'px';
}

// Ratón
document.addEventListener('mousemove', (e) => updateCircle(e.clientX, e.clientY));

// Pantalla táctil
document.addEventListener('touchmove', (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  updateCircle(touch.clientX, touch.clientY);
}, { passive: false });

// ⭐ Estrellas
const starsContainer = document.getElementById('stars-container');
const totalStars = 50;

for (let i = 0; i < totalStars; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  const size = Math.random() * 2.5 + 0.8;
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  star.style.left = Math.random() * 100 + '%';
  star.style.top = Math.random() * 55 + '%';
  star.style.animationDelay = Math.random() * 2 + 's';
  starsContainer.appendChild(star);
}

// 🌻 Girasoles
const container = document.getElementById('sunflower-container');
const sunflowers = [];
const totalSunflowers = 35;

function createSunflowers() {
  sunflowers.length = 0;
  container.innerHTML = '';
  const w = window.innerWidth;
  const h = window.innerHeight;
  
  for (let i = 0; i < totalSunflowers; i++) {
    const sf = document.createElement('div');
    sf.className = 'sunflower';
    sf.textContent = '🌻';
    const z = i / totalSunflowers;
    const x = Math.random() * w;
    const y = h * (0.25 + z * 0.6);
    sf.style.left = x + 'px';
    sf.style.top = y + 'px';
    sf.style.opacity = z;
    sf.style.fontSize = (1 + z * 2.5) + 'rem';
    sf.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(sf);
    sunflowers.push({ el: sf, baseY: y, baseSize: 1 + z * 2.5 });
  }
}

// 🌸 Pétalos
const petalsContainer = document.getElementById('petals-container');
function createPetal() {
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.textContent = '✿';
  petal.style.left = Math.random() * 100 + '%';
  petal.style.animationDuration = (Math.random() * 5 + 4) + 's';
  petalsContainer.appendChild(petal);
  setTimeout(() => petal.remove(), 9000);
}
setInterval(createPetal, 1000); // Más lento en móvil

// 🚀 Animación
let progress = 0;
let animating = true;
const finalSection = document.getElementById('final-section');

function animatePath() {
  if (!animating) return;
  if (progress < 1) {
    progress += 0.0025;
    sunflowers.forEach((sf, i) => {
      const depth = i / totalSunflowers;
      const moveFactor = progress * (1 - depth * 0.3);
      sf.el.style.top = (sf.baseY + moveFactor * 180) + 'px';
      sf.el.style.fontSize = (sf.baseSize + moveFactor * 1.8) + 'rem';
      sf.el.style.opacity = Math.min(1, depth + progress * 0.5);
    });
    requestAnimationFrame(animatePath);
  } else {
    finalSection.classList.add('show');
  }
}

// 🔄 Reiniciar
function restart() {
  animating = false;
  progress = 0;
  finalSection.classList.remove('show');
  createSunflowers();
  animating = true;
  requestAnimationFrame(animatePath);
}
document.getElementById('restart-btn').addEventListener('click', restart);

// Recalcular al girar pantalla
window.addEventListener('resize', createSunflowers);

// Iniciar
window.addEventListener('load', () => {
  createSunflowers();
  animatePath();
});
