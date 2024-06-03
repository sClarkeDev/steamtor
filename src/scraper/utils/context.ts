import type { GameInfo } from './game';
import type { UseableFetcher } from '../fetchers/types';

export type ScrapeContext = {
  fetcher: UseableFetcher;
};

export type GameScrapeContext = ScrapeContext & {
  game: GameInfo;
};
