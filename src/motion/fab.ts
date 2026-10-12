import { onScroll } from '../engine/scroll';

export function initFab() {
  const fab = document.querySelector<HTMLElement>('.fab');
  if (!fab) return;

  onScroll(({ y }) => {
    if (y > 450) {
      fab.classList.add('on');
    } else {
      fab.classList.remove('on');
    }
  });
}
