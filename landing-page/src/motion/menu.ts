import { startScroll, stopScroll } from '../engine/scroll';

export function initMenu() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const button = document.querySelector<HTMLButtonElement>('[data-menu-btn]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const label = document.querySelector<HTMLElement>('[data-menu-label]');

  if (!header || !button || !menu) return;

  const headerEl: HTMLElement = header;
  const buttonEl: HTMLButtonElement = button;
  const menuEl: HTMLElement = menu;
  const links = menuEl.querySelectorAll<HTMLAnchorElement>('a');
  const firstLink = menuEl.querySelector<HTMLAnchorElement>('[data-menu-link]');
  let isOpen = false;

  function setOpen(next: boolean) {
    if (next === isOpen) return;
    isOpen = next;

    headerEl.classList.toggle('is-open', isOpen);
    buttonEl.setAttribute('aria-expanded', String(isOpen));
    buttonEl.setAttribute('aria-label', isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    menuEl.setAttribute('aria-hidden', String(!isOpen));
    if (label) label.textContent = isOpen ? 'Fechar' : 'Menu';

    document.documentElement.classList.toggle('menu-open', isOpen);
    if (isOpen) {
      stopScroll();
      window.requestAnimationFrame(() => firstLink?.focus({ preventScroll: true }));
    } else {
      startScroll();
      buttonEl.focus({ preventScroll: true });
    }
  }

  buttonEl.addEventListener('click', () => setOpen(!isOpen));

  links.forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen) setOpen(false);
  });

  window.matchMedia('(min-width: 900px)').addEventListener('change', (event) => {
    if (event.matches && isOpen) setOpen(false);
  });
}
