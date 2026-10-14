import { onScroll, type ScrollState } from '../engine/scroll';
import { prefersReducedMotion } from '../engine/env';

// Paleta canônica da escala de tons Sandra Lourenço
const TONES = {
  carvao: '#121010',      // Nível 1 - Ébano / Carvão
  moreno: '#3A2A1F',      // Nível 2/3 - Castanho / Moreno Iluminado
  caramelo: '#7A5636',    // Nível 4/5 - Caramelo Quente
  mel: '#C79A62',         // Nível 7 - Mel Dourado
  areia: '#EDDFC7',       // Nível 9 - Areia Clara / Alisamento Orgânico
  platinado: '#F5F0E7',   // Nível 10 - Platinado / Loiro Claríssimo
  inkLight: '#F6EFE6',    // Tinta para fundos escuros
  inkDark: '#171310',     // Tinta para fundos claros
};

interface Waypoint {
  y: number;
  bg: string;
  ink: string;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const num = parseInt(clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toH = (n: number) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0');
  return '#' + toH(r) + toH(g) + toH(b);
}

function lerpColor(c1: string, c2: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(c1);
  const [r2, g2, b2] = hexToRgb(c2);
  return rgbToHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
}

function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Condutor de cor de fundo contínuo e progressivo guiado pelo scroll.
 * Transita organicamente através de toda a escala capilar:
 * Início (Carvão) -> Serviços (Moreno) -> Método (Caramelo / Mel) ->
 * Espaço (Areia) -> Avaliações (Platinado) -> FAQ (Mel / Caramelo) ->
 * Agendamento & Rodapé (Carvão Absoluto).
 */
export function initToneDriver() {
  if (prefersReducedMotion()) return;

  const metaTheme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  let waypoints: Waypoint[] = [];

  function computeWaypoints() {
    const secServices = document.getElementById('servicos');
    const secMethod = document.getElementById('metodo');
    const secSpace = document.getElementById('espaco');
    const secReviews = document.getElementById('avaliacoes');
    const secFaq = document.getElementById('faq');
    const secFinal = document.getElementById('agendar');

    const winH = window.innerHeight;
    const docH = document.documentElement.scrollHeight;
    const maxScroll = Math.max(1, docH - winH);

    const getTop = (el: HTMLElement | null, fallback: number) => {
      if (!el) return fallback;
      return el.getBoundingClientRect().top + window.scrollY;
    };

    const topServices = getTop(secServices, maxScroll * 0.15);
    const topMethod = getTop(secMethod, maxScroll * 0.35);
    const topSpace = getTop(secSpace, maxScroll * 0.50);
    const topReviews = getTop(secReviews, maxScroll * 0.65);
    const topFaq = getTop(secFaq, maxScroll * 0.78);
    const topFinal = getTop(secFinal, maxScroll * 0.90);

    const rawWaypoints: Waypoint[] = [
      // 1. Início / Hero & Marcas (Carvão Absoluto)
      { y: 0, bg: TONES.carvao, ink: TONES.inkLight },

      // 2. Fim do Manifesto / Entrada de Serviços (Transição suave para Moreno)
      { y: Math.max(0, topServices - winH * 0.6), bg: TONES.carvao, ink: TONES.inkLight },
      { y: Math.max(0, topServices - winH * 0.1), bg: TONES.moreno, ink: TONES.inkLight },

      // 3. Fim de Serviços / Entrada de Método (Evolui para Caramelo e Mel)
      { y: Math.max(0, topMethod - winH * 0.5), bg: TONES.caramelo, ink: TONES.inkLight },
      { y: Math.max(0, topMethod - winH * 0.15), bg: TONES.mel, ink: TONES.inkDark },

      // 4. Espaço (Areia Clara / Alisamento)
      { y: Math.max(0, topSpace - winH * 0.2), bg: TONES.areia, ink: TONES.inkDark },

      // 5. Avaliações (Pico de Luminosidade: Platinado)
      { y: Math.max(0, topReviews - winH * 0.2), bg: TONES.platinado, ink: TONES.inkDark },

      // 6. FAQ (Permanece no brilho e começa a transição dourada)
      { y: Math.max(0, topFaq - winH * 0.1), bg: TONES.platinado, ink: TONES.inkDark },
      { y: Math.max(0, topFaq + (secFaq?.offsetHeight || 600) * 0.3), bg: TONES.mel, ink: TONES.inkDark },

      // 7. Fechamento / Agendamento (Transita para Caramelo -> Moreno -> Carvão)
      { y: Math.max(0, topFinal - winH * 0.6), bg: TONES.caramelo, ink: TONES.inkLight },
      { y: Math.max(0, topFinal - winH * 0.3), bg: TONES.moreno, ink: TONES.inkLight },
      { y: Math.max(0, topFinal - winH * 0.05), bg: TONES.carvao, ink: TONES.inkLight },

      // 8. Fim absoluto da página (Garantia de 100% Carvão no Rodapé)
      { y: maxScroll, bg: TONES.carvao, ink: TONES.inkLight },
    ];

    // Ordena monotonicamente por y
    rawWaypoints.sort((a, b) => a.y - b.y);

    // Remove duplicatas
    waypoints = [];
    for (const wp of rawWaypoints) {
      if (waypoints.length === 0 || wp.y > waypoints[waypoints.length - 1].y + 1) {
        waypoints.push(wp);
      }
    }
  }

  function getToneAt(y: number): { bg: string; ink: string } {
    if (waypoints.length === 0) return { bg: TONES.carvao, ink: TONES.inkLight };
    if (y <= waypoints[0].y) return waypoints[0];
    const last = waypoints[waypoints.length - 1];
    if (y >= last.y) return last;

    for (let i = 0; i < waypoints.length - 1; i++) {
      const w1 = waypoints[i];
      const w2 = waypoints[i + 1];
      if (y >= w1.y && y <= w2.y) {
        const range = w2.y - w1.y;
        const t = range > 0 ? (y - w1.y) / range : 0;
        return {
          bg: lerpColor(w1.bg, w2.bg, t),
          ink: lerpColor(w1.ink, w2.ink, t),
        };
      }
    }
    return last;
  }

  let lastBg = '';
  let lastInk = '';

  function applyTone(y: number) {
    const tone = getToneAt(y);
    if (tone.bg === lastBg && tone.ink === lastInk) return;
    lastBg = tone.bg;
    lastInk = tone.ink;

    document.body.style.backgroundColor = tone.bg;
    document.body.style.color = tone.ink;
    document.documentElement.style.setProperty('--bg', tone.bg);
    document.documentElement.style.setProperty('--ink', tone.ink);

    const [r, g, b] = hexToRgb(tone.bg);
    const lum = getLuminance(r, g, b);
    const isLight = lum > 0.35;

    document.documentElement.style.setProperty(
      '--line',
      isLight ? 'rgba(23, 19, 16, 0.14)' : 'rgba(246, 239, 230, 0.16)'
    );
    document.documentElement.style.setProperty(
      '--muted',
      isLight ? 'rgba(23, 19, 16, 0.72)' : 'rgba(246, 239, 230, 0.75)'
    );

    if (metaTheme) {
      metaTheme.content = tone.bg;
    }
  }

  // Inicializa waypoints e aplica tom para o scroll atual
  computeWaypoints();
  applyTone(typeof window !== 'undefined' ? window.scrollY : 0);

  // Escuta o scroll contínuo e orgânico (Lenis + Scroll nativo unificados)
  const unsubScroll = onScroll((s: ScrollState) => {
    applyTone(s.y);
  });

  // Atualiza waypoints em redimensionamento de tela
  window.addEventListener('resize', () => {
    computeWaypoints();
    applyTone(window.scrollY);
  });
  window.addEventListener('orientationchange', () => {
    computeWaypoints();
    applyTone(window.scrollY);
  });

  return () => {
    unsubScroll();
  };
}
