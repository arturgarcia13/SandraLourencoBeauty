import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../engine/env';

gsap.registerPlugin(ScrollTrigger);

export function initTagline() {
  const p = document.querySelector<HTMLElement>('.tag p');
  if (!p) return;

  if (prefersReducedMotion()) return;

  // Split text into words if not already split
  const text = p.textContent?.trim() || '';
  const words = text.split(/\s+/);
  p.innerHTML = words.map((w) => `<span class="tag-w" style="opacity: 0.28;">${w}</span>`).join(' ');

  const wordEls = p.querySelectorAll('.tag-w');

  gsap.to(wordEls, {
    opacity: 1,
    stagger: 0.05,
    ease: 'none',
    scrollTrigger: {
      trigger: p,
      start: 'top 80%',
      end: 'bottom 40%',
      scrub: true,
    },
  });
}
