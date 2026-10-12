import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../engine/env';
import { levels, type Level } from '../lib/tones';

gsap.registerPlugin(ScrollTrigger);

export function initToneDriver() {
  if (prefersReducedMotion()) return;

  const sections = Array.from(document.querySelectorAll<HTMLElement>('section[data-tone]'));
  if (sections.length < 2) return;

  const chip = document.querySelector<HTMLElement>('.chip-level');

  sections.forEach((sec, i) => {
    const toneKey = Number(sec.dataset.tone) as Level;
    const tone = levels[toneKey];
    if (!tone) return;

    // Header chip updates when section reaches middle of viewport
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => {
        if (chip) chip.textContent = `Nível ${toneKey} · ${tone.name}`;
      },
      onEnterBack: () => {
        if (chip) chip.textContent = `Nível ${toneKey} · ${tone.name}`;
      },
    });

    if (i === 0) {
      // First section sets initial colors
      document.documentElement.style.setProperty('--bg', tone.bg);
      document.documentElement.style.setProperty('--ink', tone.ink);
      if (chip) chip.textContent = `Nível ${toneKey} · ${tone.name}`;
      return;
    }

    const prevSec = sections[i - 1];
    const prevToneKey = Number(prevSec.dataset.tone) as Level;
    const prevTone = levels[prevToneKey];
    if (!prevTone) return;

    const interpolateBg = gsap.utils.interpolate(prevTone.bg, tone.bg);

    ScrollTrigger.create({
      trigger: sec,
      start: 'top 75%',
      end: 'top 25%',
      scrub: true,
      onUpdate: (self) => {
        const bg = interpolateBg(self.progress);
        const ink = self.progress < 0.5 ? prevTone.ink : tone.ink;
        document.documentElement.style.setProperty('--bg', bg);
        document.documentElement.style.setProperty('--ink', ink);
      },
    });
  });
}
