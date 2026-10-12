import { initToneDriver } from './tone';
import { initTagline } from './tagline';
import { initSelectors } from './selector';
import { initComparisons } from './compare';
import { initFab } from './fab';

export function setupMotion() {
  initToneDriver();
  initTagline();
  initSelectors();
  initComparisons();
  initFab();
}
