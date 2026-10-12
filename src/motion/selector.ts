import { tonePicks, selectionLink, levels, type Level } from '../lib/tones';
import { setPageTone } from './tone';

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

      // Se este seletor está no Hero ou é o seletor principal:
      if (form.closest('.hero')) {
        // Altera a cor de fundo e a tinta da página para o tom escolhido!
        setPageTone(
          isNum ? (numLevel as Level) : 9,
          isNum ? `Nível ${toneData.numeral} · ${toneData.label}` : 'Alisamento · Orgânico'
        );

        // Atualiza visualmente o pôster
        if (poster) {
          if (posterNum) posterNum.textContent = toneData.numeral;
          if (posterName) posterName.textContent = toneData.label;
          poster.style.setProperty('--p-bg', toneInfo.bg);
          poster.style.setProperty('--p-ink', toneInfo.ink);
        }
      } else if (form.closest('.fin')) {
        // Se estiver no fechamento, sincroniza a seção de fechamento
        const finSec = form.closest<HTMLElement>('.fin');
        if (finSec) {
          finSec.style.setProperty('--sbg', toneInfo.bg);
          finSec.style.setProperty('--sink', toneInfo.ink);
        }
      }
    }

    toneInputs.forEach((input) => {
      input.addEventListener('change', update);
      // Suporte direto para clique e toque no container do label
      const label = input.closest('label');
      if (label) {
        label.addEventListener('click', () => {
          if (input.checked) return;
          input.checked = true;
          update();
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
