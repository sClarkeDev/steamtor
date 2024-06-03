import { gatherAllSites } from './all';

import type { GameInfoExtended, Source } from '~scraper/utils/game';

type SiteScraper = {
  getGameName: () => string;
  addDownloadButton: (game: GameInfoExtended, source: Source) => void;
};

export const makeSiteScraper = (host: string): SiteScraper | null => {
  const sites = gatherAllSites();
  const site = sites.find((s) => s.host === host);
  if (!site) return null;

  return {
    getGameName: site.getGameName,
    addDownloadButton: site.addDownloadButton
  };
};
