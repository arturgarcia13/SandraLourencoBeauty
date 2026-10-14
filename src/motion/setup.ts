import { initToneDriver } from './tone';
import { initTagline } from './tagline';
import { initSelectors } from './selector';
import { initComparisons } from './compare';
import { initFab } from './fab';
import { initHeroCarousel } from './carousel';

export function setupMotion() {
  initToneDriver();
  initTagline();
  initSelectors();
  initComparisons();
  initFab();
  initHeroCarousel();
}
