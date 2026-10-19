import { initTagline } from './tagline';
import { initComparisons } from './compare';
import { initFab } from './fab';
import { initHeroCarousel } from './carousel';
import { initMenu } from './menu';
import { initAnalytics } from './analytics';

export function setupMotion() {
  initTagline();
  initComparisons();
  initFab();
  initHeroCarousel();
  initMenu();
  initAnalytics();
}
