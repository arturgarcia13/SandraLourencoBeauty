import { tonePicks, selectionLink, levels, type Level } from '../lib/tones';

export function initSelectors() {
  const forms = document.querySelectorAll<HTMLElement>('.sel');

  forms.forEach((form) => {
    const toneInputs = form.querySelectorAll<HTMLInputElement>('input[name^="tone"]');
    const periodInputs = form.querySelectorAll<HTMLInputElement>('input[name^="period"]');
    const ctaBtn = form.querySelector<HTMLAnchorElement>('.btn--wa');
    const poster = document.querySelector<HTMLElement>('.poster');
    const posterNum = poster?.querySelector<HTMLElement>('.poster__num');
    const posterName = poster?.querySelector<HTMLElement>('.poster__name');

    function update() {
      const checkedTone = form.querySelector<HTMLInputElement>('input[name^="tone"]:checked')?.value || 'mel';
      const checkedPeriod = form.querySelector<HTMLInputElement>('input[name^="period"]:checked')?.value || 'qualquer';

      const url = selectionLink(checkedTone, checkedPeriod);
      if (ctaBtn) {
        ctaBtn.href = url;
      }

      // Update poster if this selector is attached to or controls the hero
      if (poster && form.closest('.hero')) {
        const toneData = tonePicks.find((t) => t.id === checkedTone);
        if (toneData) {
          if (posterNum) posterNum.textContent = toneData.numeral;
          if (posterName) posterName.textContent = toneData.label;

          const numLevel = Number(toneData.numeral);
          if (!isNaN(numLevel) && levels[numLevel as Level]) {
            const l = levels[numLevel as Level];
            poster.style.setProperty('--p-bg', l.bg);
            poster.style.setProperty('--p-ink', l.ink);
          } else {
            poster.style.setProperty('--p-bg', '#3a2a1f');
            poster.style.setProperty('--p-ink', '#f6efe6');
          }
        }
      }
    }

    toneInputs.forEach((input) => input.addEventListener('change', update));
    periodInputs.forEach((input) => input.addEventListener('change', update));

    // Initialize with current values
    update();
  });
}
