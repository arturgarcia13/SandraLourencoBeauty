import { onScroll } from '../engine/scroll';

/**
 * Pilula flutuante de conversa. Aparece depois do hero e some quando a
 * secao final de agendamento (#agendar) entra em cena, para nao duplicar CTA.
 */
export function initFab() {
  const fabEl = document.querySelector<HTMLElement>('.fab');
  if (!fabEl) return;
  const fab: HTMLElement = fabEl;

  const finalSection = document.getElementById('agendar');
  let pastHero = window.scrollY > 450;
  let finalVisible = false;

  function sync() {
    fab.classList.toggle('on', pastHero && !finalVisible);
  }

  onScroll(({ y }) => {
    pastHero = y > 450;
    sync();
  });

  if (finalSection && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        finalVisible = entries.some((entry) => entry.isIntersecting);
        sync();
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0 }
    );
    io.observe(finalSection);
  }

  sync();
}
