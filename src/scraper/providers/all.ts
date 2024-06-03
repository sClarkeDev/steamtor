import { oneThreeSevenSevenScraper } from './sources/1337';
import { fitgirlScraper } from './sources/fitgirl';
import { rutorScraper } from './sources/rutor';

import type { Sourcerer } from './base';

export function gatherAllSources(): Array<Sourcerer> {
  return [oneThreeSevenSevenScraper, fitgirlScraper, rutorScraper];
}
