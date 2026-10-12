export function initComparisons() {
  const sliders = document.querySelectorAll<HTMLElement>('.cmp');

  sliders.forEach((slider) => {
    const range = slider.querySelector<HTMLInputElement>('.cmp__range');

    function setPos(percent: number) {
      const clamped = Math.max(0, Math.min(100, percent));
      slider.style.setProperty('--pos', `${clamped}%`);
      if (range) range.value = String(clamped);
    }

    if (range) {
      range.addEventListener('input', () => {
        setPos(Number(range.value));
      });
    }

    let isDown = false;

    function onPointerMove(e: PointerEvent) {
      if (!isDown) return;
      const rect = slider.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = (x / rect.width) * 100;
      setPos(pct);
    }

    slider.addEventListener('pointerdown', (e) => {
      isDown = true;
      slider.setPointerCapture(e.pointerId);
      const rect = slider.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setPos((x / rect.width) * 100);
    });

    slider.addEventListener('pointermove', onPointerMove);

    const onPointerUp = (e: PointerEvent) => {
      if (isDown) {
        isDown = false;
        try {
          slider.releasePointerCapture(e.pointerId);
        } catch {
          // ignore if already released
        }
      }
    };

    slider.addEventListener('pointerup', onPointerUp);
    slider.addEventListener('pointercancel', onPointerUp);
  });
}
