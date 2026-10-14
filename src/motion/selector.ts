import { tonePicks, selectionLink, levels, type Level } from '../lib/tones';

export function initSelectors() {
  const forms = document.querySelectorAll<HTMLElement>('.sel');

  forms.forEach((form) => {
    const toneInputs = form.querySelectorAll<HTMLInputElement>('input[name$="-tone"]');
    const periodInputs = form.querySelectorAll<HTMLInputElement>('input[name$="-period"]');
    const ctaBtn = form.querySelector<HTMLAnchorElement>('.btn--wa');
    const poster = document.querySelector<HTMLElement>('.poster');
    const posterNum = poster?.querySelector<HTMLElement>('.poster__num');
    const posterName = poster?.querySelector<HTMLElement>('.poster__name');

    function update() {
      const checkedTone =
        form.querySelector<HTMLInputElement>('input[name$="-tone"]:checked')?.value || 'mel';
      const checkedPeriod =
        form.querySelector<HTMLInputElement>('input[name$="-period"]:checked')?.value || 'qualquer';

      const url = selectionLink(checkedTone, checkedPeriod);
      if (ctaBtn) {
        ctaBtn.href = url;
      }

      const toneData = tonePicks.find((t) => t.id === checkedTone);
      if (!toneData) return;

      const numLevel = Number(toneData.numeral);
      const isNum = !isNaN(numLevel) && levels[numLevel as Level];
      const toneInfo = isNum ? levels[numLevel as Level] : levels[9]; // Alisamento usa tom Areia clara (nível 9)

      // Se este seletor está no Hero com pôster tipográfico: altera as cores do pôster
      if (form.closest('.hero')) {
        if (poster) {
          if (posterNum) posterNum.textContent = toneData.numeral;
          if (posterName) posterName.textContent = toneData.label;
          poster.style.setProperty('--p-bg', toneInfo.bg);
          poster.style.setProperty('--p-ink', toneInfo.ink);
        }
      }
    }

    toneInputs.forEach((input) => {
      const label = input.closest('label');

      input.addEventListener('change', update);

      // Suporte direto para clique e toque no container do label
      if (label) {
        label.addEventListener('click', (e) => {
          if (e.target !== input) {
            input.checked = true;
            update();
          }
        });
      }
    });

    periodInputs.forEach((input) => {
      input.addEventListener('change', update);
      const label = input.closest('label');
      if (label) {
        label.addEventListener('click', () => {
          if (input.checked) return;
          input.checked = true;
          update();
        });
      }
    });

    // Inicia com os valores selecionados no carregamento
    update();
  });
}
