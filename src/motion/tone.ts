import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../engine/env';
import { levels, type Level } from '../lib/tones';

/**
 * Atualiza a cor de fundo e a tinta da página de forma centralizada e suave.
 */
export function setPageTone(toneKey: Level | number, _label?: string) {
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
}

/**
 * Inicializa os gatilhos de scroll que conduzem o tom da página.
 * Escala cromática contínua:
 * 1 (Carvão) -> 2 (Espresso) -> 3 (Castanho escuro) -> 4 (Moreno) -> 9 (Areia clara) -> 10 (Platinado) -> 1 (Carvão).
 */
export function initToneDriver() {
  if (prefersReducedMotion()) return;

  const sections = Array.from(document.querySelectorAll<HTMLElement>('section[data-tone]'));
  if (sections.length < 2) return;

  sections.forEach((sec) => {
    const toneKey = Number(sec.dataset.tone) as Level;
    const toneLabel = sec.dataset.toneLabel;
    if (!levels[toneKey]) return;

    ScrollTrigger.create({
      trigger: sec,
      start: 'top 55%',
      end: 'bottom 45%',
      onEnter: () => setPageTone(toneKey, toneLabel),
      onEnterBack: () => setPageTone(toneKey, toneLabel),
    });
  });
}
