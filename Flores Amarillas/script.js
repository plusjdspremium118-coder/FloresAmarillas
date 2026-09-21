/* ===================================================================
   FLORES AMARILLAS — 21 DE SEPTIEMBRE
   Lógica principal: Interacción, animaciones y partículas
   =================================================================== */

/* ===================================================================
   <!-- EDITAR AQUÍ EL MENSAJE -->
   Cambia estos valores para personalizar la dedicatoria
   =================================================================== */
const MESSAGE_CONFIG = {
  titulo: "Feliz día de las flores amarillas",
  texto: "Que cada pétalo amarillo te recuerde lo especial que eres y que no es necesario un día en específico para demostrarte lo que puedes importarle a alguien. Estas flores son para ti, ten un buen dia Princesa Hermosa.",
  firma: "Con mucho cariño ♥"
};

/* ===================================================================
   CONFIGURACIÓN DE LA LLUVIA DE FLORES
   Ajusta estos valores para cambiar la intensidad
   =================================================================== */
const FLOWER_CONFIG = {
  // Cantidad máxima de flores simultáneas
  maxDesktop: 55,
  maxMobile: 25,

  // Milisegundos entre cada nueva flor
  spawnRate: 140,

  // Tamaño en px
  sizeMin: 16,
  sizeMax: 44,

  // Velocidad de caída (segundos)
  fallMin: 3.5,
  fallMax: 9,

  // Oscilación lateral en px
  swayRange: 90,

  // Duración de la explosión inicial (ms)
  burstDuration: 3000,

  // Flores en la explosión inicial (¡más = más espectacular!)
  burstCount: 70,
  burstCountMobile: 35,

  // Oleadas de la explosión
  burstWaves: 3,
  burstWaveDelay: 400
};

/* ===================================================================
   PLANTILLAS SVG DE FLORES Y PÉTALOS
   =================================================================== */
const FLOWER_SVGS = [
  // 1. Girasol con 8 pétalos y centro oscuro
  (id) => `<svg viewBox="0 0 100 100"><defs>
    <linearGradient id="gp1${id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/><stop offset="50%" stop-color="#facc15"/>
      <stop offset="100%" stop-color="#d97706"/></linearGradient></defs>
    <g transform="translate(50,50)">
      <ellipse cx="0" cy="-26" rx="8" ry="18" fill="url(#gp1${id})" transform="rotate(0)"/>
      <ellipse cx="0" cy="-26" rx="8" ry="18" fill="url(#gp1${id})" transform="rotate(45)"/>
      <ellipse cx="0" cy="-26" rx="8" ry="18" fill="url(#gp1${id})" transform="rotate(90)"/>
      <ellipse cx="0" cy="-26" rx="8" ry="18" fill="url(#gp1${id})" transform="rotate(135)"/>
      <ellipse cx="0" cy="-26" rx="8" ry="18" fill="url(#gp1${id})" transform="rotate(180)"/>
      <ellipse cx="0" cy="-26" rx="8" ry="18" fill="url(#gp1${id})" transform="rotate(225)"/>
      <ellipse cx="0" cy="-26" rx="8" ry="18" fill="url(#gp1${id})" transform="rotate(270)"/>
      <ellipse cx="0" cy="-26" rx="8" ry="18" fill="url(#gp1${id})" transform="rotate(315)"/>
      <circle cx="0" cy="0" r="10" fill="#78350f" stroke="#92400e" stroke-width="1.5"/>
      <circle cx="-3" cy="-3" r="3" fill="#a16207" opacity="0.4"/>
    </g></svg>`,

  // 2. Margarita de 5 pétalos
  (id) => `<svg viewBox="0 0 100 100"><defs>
    <radialGradient id="gp2${id}" cx="30%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#fffde7"/><stop offset="50%" stop-color="#fdd835"/>
      <stop offset="100%" stop-color="#f9a825"/></radialGradient></defs>
    <g transform="translate(50,50)">
      <path d="M0,-4 C-10,-22 -7,-36 0,-38 C7,-36 10,-22 0,-4" fill="url(#gp2${id})"/>
      <path d="M0,-4 C-10,-22 -7,-36 0,-38 C7,-36 10,-22 0,-4" fill="url(#gp2${id})" transform="rotate(72)"/>
      <path d="M0,-4 C-10,-22 -7,-36 0,-38 C7,-36 10,-22 0,-4" fill="url(#gp2${id})" transform="rotate(144)"/>
      <path d="M0,-4 C-10,-22 -7,-36 0,-38 C7,-36 10,-22 0,-4" fill="url(#gp2${id})" transform="rotate(216)"/>
      <path d="M0,-4 C-10,-22 -7,-36 0,-38 C7,-36 10,-22 0,-4" fill="url(#gp2${id})" transform="rotate(288)"/>
      <circle cx="0" cy="0" r="7" fill="#b45309"/>
    </g></svg>`,

  // 3. Flor silvestre de 6 pétalos redondos
  (id) => `<svg viewBox="0 0 100 100"><defs>
    <linearGradient id="gp3${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff9c4"/><stop offset="60%" stop-color="#ffee58"/>
      <stop offset="100%" stop-color="#f9a825"/></linearGradient></defs>
    <g transform="translate(50,50)">
      <circle cx="0" cy="-20" r="13" fill="url(#gp3${id})" opacity="0.9"/>
      <circle cx="17" cy="-10" r="13" fill="url(#gp3${id})" opacity="0.9"/>
      <circle cx="17" cy="10" r="13" fill="url(#gp3${id})" opacity="0.9"/>
      <circle cx="0" cy="20" r="13" fill="url(#gp3${id})" opacity="0.9"/>
      <circle cx="-17" cy="10" r="13" fill="url(#gp3${id})" opacity="0.9"/>
      <circle cx="-17" cy="-10" r="13" fill="url(#gp3${id})" opacity="0.9"/>
      <circle cx="0" cy="0" r="9" fill="#e65100" stroke="#bf360c" stroke-width="1"/>
    </g></svg>`,

  // 4. Pétalo suelto (hoja curva)
  (id) => `<svg viewBox="0 0 60 90"><defs>
    <linearGradient id="gp4${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fffde7"/><stop offset="50%" stop-color="#fdd835"/>
      <stop offset="100%" stop-color="#f57f17"/></linearGradient></defs>
    <path d="M30,5 C50,28 52,60 30,85 C8,60 10,28 30,5 Z" fill="url(#gp4${id})" 
      stroke="rgba(245,127,23,0.3)" stroke-width="0.6"/></svg>`,

  // 5. Rosa compacta amarilla
  (id) => `<svg viewBox="0 0 100 100"><defs>
    <radialGradient id="gp5${id}" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#fff9c4"/><stop offset="50%" stop-color="#fdd835"/>
      <stop offset="100%" stop-color="#e65100"/></radialGradient></defs>
    <g transform="translate(50,50)">
      <circle cx="0" cy="0" r="30" fill="url(#gp5${id})" opacity="0.25"/>
      <path d="M-18,-14 C-8,-32 8,-32 18,-14 C32,-6 32,10 18,18 C8,32 -8,32 -18,18 C-32,10 -32,-6 -18,-14 Z" 
        fill="#facc15" stroke="#e6a700" stroke-width="1"/>
      <circle cx="0" cy="0" r="12" fill="#f9a825"/>
      <path d="M-5,-5 Q0,-10 5,-5 Q10,0 5,5 Q0,10 -5,5 Q-10,0 -5,-5 Z" fill="#e65100" opacity="0.7"/>
    </g></svg>`,

  // 6. Mini flor simple (acento)
  (id) => `<svg viewBox="0 0 80 80"><defs>
    <linearGradient id="gp6${id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fff59d"/><stop offset="100%" stop-color="#ffb300"/>
    </linearGradient></defs>
    <g transform="translate(40,40)">
      <ellipse cx="0" cy="-16" rx="6" ry="12" fill="url(#gp6${id})" transform="rotate(0)"/>
      <ellipse cx="0" cy="-16" rx="6" ry="12" fill="url(#gp6${id})" transform="rotate(90)"/>
      <ellipse cx="0" cy="-16" rx="6" ry="12" fill="url(#gp6${id})" transform="rotate(180)"/>
      <ellipse cx="0" cy="-16" rx="6" ry="12" fill="url(#gp6${id})" transform="rotate(270)"/>
      <circle cx="0" cy="0" r="5" fill="#ff8f00"/>
    </g></svg>`
];

/* ===================================================================
   INICIALIZACIÓN
   =================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Elementos
  const envelopeSection = document.getElementById("envelopeSection");
  const envelope = document.getElementById("envelope");
  const revealSection = document.getElementById("revealSection");
  const bouquetWrapper = document.getElementById("bouquetWrapper");
  const messageBlock = document.getElementById("messageBlock");
  const particlesContainer = document.getElementById("particles-container");

  // Inyectar texto personalizable si el HTML no tiene contenido
  const titleEl = document.getElementById("messageTitle");
  const textEl = document.getElementById("messageText");
  const sigEl = document.getElementById("messageSignature");
  if (!titleEl.textContent.trim()) titleEl.textContent = MESSAGE_CONFIG.titulo;
  if (!textEl.textContent.trim()) textEl.textContent = MESSAGE_CONFIG.texto;
  if (!sigEl.textContent.trim()) sigEl.textContent = MESSAGE_CONFIG.firma;

  let isOpened = false;
  let rainInterval = null;
  let flowerIdCounter = 0;

  // Detectar móvil
  const isMobile = () => window.innerWidth <= 600;

  /* =================================================================
     SISTEMA DE PARTÍCULAS — CREAR UNA FLOR
  ================================================================= */
  function createFlower(options = {}) {
    const id = flowerIdCounter++;
    const currentCount = particlesContainer.children.length;
    const maxFlowers = isMobile() ? FLOWER_CONFIG.maxMobile : FLOWER_CONFIG.maxDesktop;
    if (currentCount >= maxFlowers && !options.burst) return;

    const el = document.createElement("div");
    el.className = "petal";

    // Elegir SVG aleatorio
    const svgFactory = FLOWER_SVGS[Math.floor(Math.random() * FLOWER_SVGS.length)];
    el.innerHTML = svgFactory(id);

    // Propiedades aleatorias
    const size = Math.random() * (FLOWER_CONFIG.sizeMax - FLOWER_CONFIG.sizeMin) + FLOWER_CONFIG.sizeMin;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;

    if (options.burst) {
      // Explosión desde el centro del sobre
      const rect = envelope.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      el.style.left = `${cx}px`;
      el.style.top = `${cy}px`;

      const angle = Math.random() * Math.PI * 2;
      const maxDist = isMobile() ? 240 : 550;
      const distance = 80 + Math.random() * maxDist;
      const dx = Math.cos(angle) * distance;
      const upwardBias = isMobile() ? 220 : 350;
      const dy = Math.sin(angle) * distance - upwardBias; // sesgo hacia arriba
      const rot = Math.random() * 1080 - 540;
      const dur = 1800 + Math.random() * 2200;
      const peakScale = 0.8 + Math.random() * 0.6;
      const fallDistance = isMobile() ? 500 : 800;

      particlesContainer.appendChild(el);

      const anim = el.animate([
        {
          transform: `translate(0, 0) rotate(0deg) scale(0.1)`,
          opacity: 0
        },
        {
          transform: `translate(${dx * 0.15}px, ${dy * 0.3}px) rotate(${rot * 0.2}deg) scale(${peakScale})`,
          opacity: 1,
          offset: 0.15
        },
        {
          transform: `translate(${dx * 0.5}px, ${dy * 0.6}px) rotate(${rot * 0.6}deg) scale(${peakScale * 0.9})`,
          opacity: 0.9,
          offset: 0.4
        },
        {
          transform: `translate(${dx}px, ${dy + fallDistance}px) rotate(${rot}deg) scale(0.5)`,
          opacity: 0
        }
      ], {
        duration: dur,
        easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        fill: "forwards"
      });

      anim.onfinish = () => el.remove();
    } else {
      // Lluvia continua desde arriba (con límites seguros para móvil)
      const startX = 5 + Math.random() * 90;
      el.style.left = `${startX}%`;
      el.style.top = `-${size + 10}px`;

      const fallDuration = (Math.random() * (FLOWER_CONFIG.fallMax - FLOWER_CONFIG.fallMin) + FLOWER_CONFIG.fallMin) * 1000;
      const swayMax = isMobile() ? 35 : FLOWER_CONFIG.swayRange;
      const sway = (Math.random() * 2 - 1) * swayMax;
      const rotStart = Math.random() * 360;
      const rotEnd = rotStart + (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360);
      const peakOpacity = (0.6 + Math.random() * 0.4).toFixed(2);
      const h = window.innerHeight || 800;

      particlesContainer.appendChild(el);

      const anim = el.animate([
        {
          transform: `translate3d(0, 0, 0) rotate(${rotStart}deg) scale(0.5)`,
          opacity: 0
        },
        {
          transform: `translate3d(${sway * 0.3}px, ${h * 0.15}px, 0) rotate(${rotStart + 40}deg) scale(1)`,
          opacity: peakOpacity,
          offset: 0.12
        },
        {
          transform: `translate3d(${sway}px, ${h * 0.55}px, 0) rotate(${(rotStart + rotEnd) / 2}deg)`,
          offset: 0.55
        },
        {
          transform: `translate3d(${sway * 0.5}px, ${h * 0.85}px, 0) rotate(${rotEnd - 30}deg)`,
          opacity: peakOpacity,
          offset: 0.85
        },
        {
          transform: `translate3d(${sway * 0.7}px, ${h + 80}px, 0) rotate(${rotEnd}deg)`,
          opacity: 0
        }
      ], {
        duration: fallDuration,
        easing: "cubic-bezier(0.37, 0, 0.63, 1)",
        fill: "forwards"
      });

      anim.onfinish = () => el.remove();
    }
  }

  /* =================================================================
     EXPLOSIÓN INICIAL DE FLORES DESDE EL SOBRE
  ================================================================= */
  function triggerBurst() {
    const countPerWave = Math.ceil(
      (isMobile() ? FLOWER_CONFIG.burstCountMobile : FLOWER_CONFIG.burstCount) / FLOWER_CONFIG.burstWaves
    );

    for (let wave = 0; wave < FLOWER_CONFIG.burstWaves; wave++) {
      setTimeout(() => {
        for (let i = 0; i < countPerWave; i++) {
          setTimeout(() => createFlower({ burst: true }), i * 30);
        }
      }, wave * FLOWER_CONFIG.burstWaveDelay);
    }
  }

  /* =================================================================
     LLUVIA CONTINUA
  ================================================================= */
  function startRain() {
    if (rainInterval) clearInterval(rainInterval);
    rainInterval = setInterval(() => createFlower(), FLOWER_CONFIG.spawnRate);
  }

  function stopRain() {
    if (rainInterval) {
      clearInterval(rainInterval);
      rainInterval = null;
    }
  }

  /* =================================================================
     SECUENCIA PRINCIPAL DE APERTURA
  ================================================================= */
  function openSequence() {
    if (isOpened) return;
    isOpened = true;

    // Paso 1: Abrir la solapa del sobre (3D flip)
    envelope.classList.add("opening");

    // Paso 2: Tras 500ms, GRAN explosión de flores desde el sobre
    setTimeout(() => {
      triggerBurst();
    }, 500);

    // Paso 3: Tras 1.2s, comenzar lluvia continua
    setTimeout(() => {
      startRain();
    }, 1200);

    // Paso 4: Tras 2.5s, ocultar sobre, intensificar fondo y mostrar revelado
    setTimeout(() => {
      envelopeSection.classList.add("hidden");
      revealSection.classList.add("active");

      // Intensificar el fondo floral para que el ramo se mimetice
      const bgFlowers = document.querySelector(".bg-flowers");
      if (bgFlowers) bgFlowers.classList.add("enhanced");

      // Paso 5: Tras 1s, el ramo crece desde el centro
      setTimeout(() => {
        bouquetWrapper.classList.add("visible");

        // Paso 6: Tras 1.5s, el mensaje aparece
        setTimeout(() => {
          messageBlock.classList.add("visible");

          // Paso 7: Lluvia se detiene gradualmente
          setTimeout(() => {
            stopRain();
          }, 10000);
        }, 1500);
      }, 1000);
    }, 2500);
  }

  /* =================================================================
     EVENT LISTENERS
  ================================================================= */
  envelope.addEventListener("click", openSequence);
  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openSequence();
    }
  });
});
