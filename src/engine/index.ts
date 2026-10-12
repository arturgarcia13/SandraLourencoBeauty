import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScroll, startScroll } from './scroll';
import { initReveals } from './reveal';
import { prefersReducedMotion } from './env';

export { onScroll, scrollState, scrollToTarget, stopScroll, startScroll } from './scroll';
export { ease, isTouch, isMobile, prefersReducedMotion } from './env';

export type PageFn = (page: { intro: gsap.core.Timeline; path: string }) => void | (() => void);
const pageFns = new Set<PageFn>();
const cleanups: (() => void)[] = [];
let ctx: gsap.Context | null = null;
let intro: gsap.core.Timeline | null = null;
let ready = false;
let booted = false;

/** Run fn on every page load (and now, if a page is ready). Returns an unsubscribe. */
export function onPage(fn: PageFn) {
  pageFns.add(fn);
  if (ready) runPageFn(fn);
  return () => {
    pageFns.delete(fn);
  };
}

function runPageFn(fn: PageFn) {
  ctx?.add(() => {
    const c = fn({ intro: intro!, path: window.location.pathname });
    if (typeof c === 'function') cleanups.push(c);
  });
}

// Flags on <html>. Re-applied to keep state clean
export function syncFlags() {
  if (typeof document === 'undefined') return;
  const h = document.documentElement.classList;
  h.add('js', 'is-booted');
  h.toggle('motion', !prefersReducedMotion());
}

function initPage() {
  syncFlags();
  ctx = gsap.context(() => {
    intro = initReveals(document);
  });
  ready = true;
  pageFns.forEach(runPageFn);
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

/** First load. `setup` runs once on the client after scroll init. */
export async function boot(setup?: () => void) {
  if (booted) return;
  booted = true;
  syncFlags();
  initScroll();
  setup?.();
  initPage();
  intro?.play();
  startScroll();
}
