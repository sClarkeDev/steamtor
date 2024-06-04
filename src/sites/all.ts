import { cdkeysSite } from './sources/cdkeys';
import { steamSite } from './sources/steam';

import type { Site } from './base';

export function gatherAllSites(): Array<Site> {
  return [steamSite, cdkeysSite];
}
