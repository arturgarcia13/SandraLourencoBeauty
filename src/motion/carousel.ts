import { prefersReducedMotion } from '../engine/env';

export function initHeroCarousel() {
  const containerEl = document.querySelector<HTMLElement>('[data-hero-carousel]');
  if (!containerEl) return;
  const container: HTMLElement = containerEl;

  const slides = container.querySelectorAll<HTMLElement>('.hero-carousel__slide');
  const bars = container.querySelectorAll<HTMLElement>('.hero-carousel__bar');
  const currentCounter = container.querySelector<HTMLElement>('[data-carousel-current]');
  const toggle = container.querySelector<HTMLButtonElement>('[data-carousel-toggle]');

  if (slides.length <= 1) return;

  let currentIndex = 0;
  let timer: ReturnType<typeof setInterval> | null = null;
  const intervalMs = 4500;

  // Motivos independentes de pausa: hover, foco de teclado e comando manual.
  let hoverPaused = false;
  let focusPaused = false;
  let manualPaused = false;

  function pausedNow() {
    return hoverPaused || focusPaused || manualPaused || document.visibilityState !== 'visible';
  }

  function goToSlide(index: number) {
    const nextIndex = (index + slides.length) % slides.length;
    if (nextIndex === currentIndex && slides[currentIndex]?.classList.contains('is-active')) {
      return;
    }

    currentIndex = nextIndex;

    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add('is-active');
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.classList.remove('is-active');
        slide.setAttribute('aria-hidden', 'true');
      }
    });

    bars.forEach((bar, i) => {
      const progress = bar.querySelector<HTMLElement>('.hero-carousel__progress');
      if (i === currentIndex) {
        bar.classList.remove('is-active');
        if (progress) void progress.offsetWidth;
        bar.classList.add('is-active');
        bar.setAttribute('aria-selected', 'true');
      } else {
        bar.classList.remove('is-active');
        bar.setAttribute('aria-selected', 'false');
      }
    });

    if (currentCounter) {
      currentCounter.textContent = String(currentIndex + 1).padStart(2, '0');
    }
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    if (prefersReducedMotion()) return;
    stopAutoplay();
    timer = setInterval(() => {
      if (!pausedNow()) nextSlide();
    }, intervalMs);
  }

  function stopAutoplay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function updateToggle() {
    container.classList.toggle('is-paused', manualPaused);
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', manualPaused ? 'true' : 'false');
    toggle.setAttribute('aria-label', manualPaused ? 'Retomar apresentação automática' : 'Pausar apresentação automática');
    toggle.classList.toggle('is-paused', manualPaused);
  }

  // Interactive indicators click
  bars.forEach((bar) => {
    bar.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetIndex = Number(bar.dataset.index);
      if (!Number.isNaN(targetIndex)) {
        goToSlide(targetIndex);
        startAutoplay();
      }
    });
  });

  // Pausa/retoma manual
  toggle?.addEventListener('click', () => {
    manualPaused = !manualPaused;
    updateToggle();
  });
  updateToggle();

  // Pausa no foco de teclado (nao interfere no clique de mouse)
  container.addEventListener('focusin', (e) => {
    const target = e.target as Element | null;
    try {
      if (target?.matches?.(':focus-visible')) focusPaused = true;
    } catch {
      /* :focus-visible nao suportado: ignora */
    }
  });
  container.addEventListener('focusout', () => {
    focusPaused = false;
  });

  // Pausa no hover
  container.addEventListener('mouseenter', () => {
    hoverPaused = true;
  });
  container.addEventListener('mouseleave', () => {
    hoverPaused = false;
  });

  // Suporte a swipe no toque
  let touchStartX = 0;
  let touchStartY = 0;

  container.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        hoverPaused = true;
      }
    },
    { passive: true }
  );

  container.addEventListener(
    'touchend',
    (e) => {
      hoverPaused = false;
      if (e.changedTouches.length === 1) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            nextSlide();
          } else {
            prevSlide();
          }
          startAutoplay();
        }
      }
    },
    { passive: true }
  );

  // Pausa quando a aba fica oculta
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  startAutoplay();
}
