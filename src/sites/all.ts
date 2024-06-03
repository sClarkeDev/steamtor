import { steamSite } from './sources/steam';

import type { Site } from './base';

export function gatherAllSites(): Array<Site> {
  return [steamSite];
}
