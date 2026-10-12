import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../engine/env';
import { levels, type Level } from '../lib/tones';

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
 * - Início (Hero até Resultados): Preto (#121010, Nível 1 · Carvão), o mesmo do fechamento.
 * - Menu de procedimentos (#servicos): Moreno (#3A2A1F, Nível 4).
 * - Protocolo da casa (#metodo) e O Espaço (#espaco): Areia clara (#EDDFC7, Nível 9).
 * - Avaliações (#avaliacoes) e FAQ (#faq): Platinado (#F5F0E7, Nível 10).
 * - Fechamento (#agendar): Preto (#121010, Nível 1 · Carvão).
 */
export function initToneDriver() {
  if (prefersReducedMotion()) return;

  const servicosSec = document.querySelector<HTMLElement>('#servicos');
  if (!servicosSec) return;

  // 1. Bloco inicial (Hero até Resultados): preto #121010
  ScrollTrigger.create({
    trigger: '#inicio',
    endTrigger: '#resultados',
    start: 'top top',
    end: 'bottom 50%',
    onEnter: () => setPageTone(1, 'Nível 1 · Carvão'),
    onEnterBack: () => setPageTone(1, 'Nível 1 · Carvão'),
  });

  // 2. Seções narrativas a partir do "Menu de procedimentos" (#servicos):
  const narrativeSections = Array.from(
    document.querySelectorAll<HTMLElement>('#servicos, #metodo, #espaco, #avaliacoes, #faq, #agendar')
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
        // Ao rolar de volta para cima saindo de "Menu de procedimentos", volta para o preto inicial
        if (sec.id === 'servicos') {
          setPageTone(1, 'Nível 1 · Carvão');
        }
      },
    });
  });
}
