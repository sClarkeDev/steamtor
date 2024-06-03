import type { GameInfoExtended, Source } from '~scraper/utils/game';

export type SiteOptions = {
  id: string;
  name: string;
  host: string;
  disabled?: boolean;
  getGameName: () => string;
  addDownloadButton: (game: GameInfoExtended, source: Source) => void;
};

export type Site = SiteOptions;

export function makeSite(state: SiteOptions): Site {
  return state;
}
