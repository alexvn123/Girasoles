// Círculo del toque / ratón
const touchCircle = document.getElementById('touch-circle');

function updateCircle(x, y) {
  touchCircle.style.left = (x - 21) + 'px';
  touchCircle.style.top = (y - 21) + 'px';
}

document.addEventListener('mousemove', (e) => updateCircle(e.clientX, e.clientY));

document.addEventListener('touchmove', (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  updateCircle(touch.clientX, touch.clientY);
}, { passive: false });

// ⛅ Nubes que se mueven
const cloudsContainer = document.getElementById('clouds-container');
const totalClouds = 12;

for (let i = 0; i < totalClouds; i++) {
  const cloud = document.createElement('div');
  cloud.className = 'cloud';

  const size = Math.random() * 35 + 25;
  cloud.style.width = size + 'px';
  cloud.style.height = size * 0.6 + 'px';
  cloud.style.top = Math.random() * 35 + '%';
  cloud.style.animationDelay = Math.random() * 20 + 's';
  cloud.style.animationDuration = Math.random() * 25 + 15 + 's';

  cloudsContainer.appendChild(cloud);
}

// 🌻 Girasoles en el campo
const field = document.getElementById('sunflower-field');
const sunflowers = [];
const totalSunflowers = 45;

function createSunflowers() {
  sunflowers.length = 0;
  field.innerHTML = '';

  const w = window.innerWidth;
  const h = window.innerHeight;

  for (let i = 0; i < totalSunflowers; i++) {
    const sf = document.createElement('div');
    sf.className = 'sunflower';
    sf.textContent = '🌻';

    const z = i / totalSunflowers;

    // Más cerca = más grande y más abajo
    const size = 1.2 + z * 2.8;
    const x = Math.random() * w;
    const y = h * 0.58 + z * (h * 0.18);

    sf.style.left = x + 'px';
    sf.style.top = y + 'px';
    sf.style.fontSize = size + 'rem';
    sf.style.opacity = 0.35 + z * 0.65;
    sf.style.animationDelay = Math.random() * 2 + 's';

    field.appendChild(sf);

    sunflowers.push({
      el: sf,
      baseY: y,
      baseSize: size
    });
  }
}

// 🌸 Pétalos cayendo
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

setInterval(createPetal, 900);

// 🚀 Animación de avance
let progress = 0;
let animating = true;
const finalMessage = document.getElementById('final-message');

function animatePath() {
  if (!animating) return;

  if (progress < 1) {
    progress += 0.0022;

    sunflowers.forEach((sf, i) => {
      const depth = i / totalSunflowers;
      const moveFactor = progress * (1 - depth * 0.28);

      sf.el.style.top = (sf.baseY + moveFactor * 150) + 'px';
      sf.el.style.fontSize = (sf.baseSize + moveFactor * 1.6) + 'rem';
      sf.el.style.opacity = Math.min(1, depth + progress * 0.45);
    });

    requestAnimationFrame(animatePath);
  } else {
    finalMessage.classList.add('show');
  }
}

// 🔄 Reiniciar
function restart() {
  animating = false;
  progress = 0;
  finalMessage.classList.remove('show');
  createSunflowers();
  animating = true;
  requestAnimationFrame(animatePath);
}

document.getElementById('restart-btn').addEventListener('click', restart);

// Ajustar si gira la pantalla
window.addEventListener('resize', createSunflowers);

// Iniciar
window.addEventListener('load', () => {
  createSunflowers();
  animatePath();
});
