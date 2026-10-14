import { prefersReducedMotion } from '../engine/env';

export function initHeroCarousel() {
  const container = document.querySelector<HTMLElement>('[data-hero-carousel]');
  if (!container) return;

  const slides = container.querySelectorAll<HTMLElement>('.hero-carousel__slide');
  const bars = container.querySelectorAll<HTMLElement>('.hero-carousel__bar');
  const currentCounter = container.querySelector<HTMLElement>('[data-carousel-current]');

  if (slides.length <= 1) return;

  let currentIndex = 0;
  let timer: ReturnType<typeof setInterval> | null = null;
  const intervalMs = 4500;
  let isPaused = false;

  function goToSlide(index: number) {
    const nextIndex = (index + slides.length) % slides.length;
    if (nextIndex === currentIndex && slides[currentIndex]?.classList.contains('is-active')) {
      return;
    }

    currentIndex = nextIndex;

    // Update slides with crossfade
    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add('is-active');
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.classList.remove('is-active');
        slide.setAttribute('aria-hidden', 'true');
      }
    });

    // Reset and update progress bars
    bars.forEach((bar, i) => {
      const progress = bar.querySelector<HTMLElement>('.hero-carousel__progress');
      if (i === currentIndex) {
        bar.classList.remove('is-active');
        // Force reflow to restart CSS animation
        if (progress) void progress.offsetWidth;
        bar.classList.add('is-active');
        bar.setAttribute('aria-selected', 'true');
      } else {
        bar.classList.remove('is-active');
        bar.setAttribute('aria-selected', 'false');
      }
    });

    // Update counter
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
      if (!isPaused && document.visibilityState === 'visible') {
        nextSlide();
      }
    }, intervalMs);
  }

  function stopAutoplay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
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

  // Pause on hover
  container.addEventListener('mouseenter', () => {
    isPaused = true;
  });

  container.addEventListener('mouseleave', () => {
    isPaused = false;
  });

  // Touch swipe support
  let touchStartX = 0;
  let touchStartY = 0;

  container.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isPaused = true;
      }
    },
    { passive: true }
  );

  container.addEventListener(
    'touchend',
    (e) => {
      isPaused = false;
      if (e.changedTouches.length === 1) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        // Threshold 40px horizontal swipe
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

  // Pause when browser tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  startAutoplay();
}
