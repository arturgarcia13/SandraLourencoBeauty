import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../engine/env';
import { levels, type Level } from '../lib/tones';

// Armazena o tom atualmente escolhido no Hero (iniciando em Mel · Nível 7)
let currentHeroToneKey: Level | number = 7;
let currentHeroToneLabel = 'Nível 7 · Mel';

/**
 * Atualiza o tom escolhido no Hero para persistência durante a navegação.
 */
export function setHeroTone(toneKey: Level | number, label?: string) {
  currentHeroToneKey = toneKey;
  if (label) currentHeroToneLabel = label;
}

/**
 * Aplica o tom atualmente escolhido no Hero à página inteira.
 */
export function applyHeroTone() {
  setPageTone(currentHeroToneKey, currentHeroToneLabel);
}

/**
 * Atualiza a cor de fundo e a tinta da página de forma centralizada e suave.
 */
export function setPageTone(toneKey: Level | number, label?: string) {
  const tone = levels[toneKey as Level];
  if (!tone) return;

  const isLight = tone.ink === '#171310';

  document.documentElement.style.setProperty('--bg', tone.bg);
  document.documentElement.style.setProperty('--ink', tone.ink);
  document.documentElement.style.setProperty(
    '--line',
    isLight ? 'rgba(23, 19, 16, 0.14)' : 'rgba(246, 239, 230, 0.16)'
  );
  document.documentElement.style.setProperty(
    '--muted',
    isLight ? 'rgba(23, 19, 16, 0.72)' : 'rgba(246, 239, 230, 0.75)'
  );

  // Sincroniza a barra do navegador em dispositivos móveis
  const metaTheme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.content = tone.bg;
  }

  const chip = document.querySelector<HTMLElement>('.chip-level');
  if (chip) {
    chip.textContent = label || `Nível ${toneKey} · ${tone.name}`;
  }
}

/**
 * Inicializa os gatilhos de scroll que conduzem o tom da página.
 * O tom escolhido no Hero é mantido continuamente até a seção "Protocolo da casa" (#metodo).
 */
export function initToneDriver() {
  if (prefersReducedMotion()) return;

  const metodoSec = document.querySelector<HTMLElement>('#metodo');
  if (!metodoSec) return;

  // 1. Zona inicial (Hero até Serviços):
  // Mantém e restaura o tom escolhido no Hero sempre que estiver nesta área.
  ScrollTrigger.create({
    trigger: '#inicio',
    endTrigger: '#servicos',
    start: 'top top',
    end: 'bottom 50%',
    onEnter: () => applyHeroTone(),
    onEnterBack: () => applyHeroTone(),
  });

  // 2. Seções narrativas a partir do "Protocolo da casa" (#metodo) até o fechamento:
  const narrativeSections = Array.from(
    document.querySelectorAll<HTMLElement>('#metodo, #espaco, #avaliacoes, #faq, #agendar')
  );

  narrativeSections.forEach((sec) => {
    const toneKey = Number(sec.dataset.tone) as Level;
    const toneLabel = sec.dataset.toneLabel;
    if (!levels[toneKey]) return;

    ScrollTrigger.create({
      trigger: sec,
      start: 'top 55%',
      end: 'bottom 45%',
      onEnter: () => setPageTone(toneKey, toneLabel),
      onEnterBack: () => setPageTone(toneKey, toneLabel),
      onLeaveBack: () => {
        // Ao rolar de volta para cima saindo de "Protocolo da casa", volta ao tom escolhido no Hero
        if (sec.id === 'metodo') {
          applyHeroTone();
        }
      },
    });
  });
}
