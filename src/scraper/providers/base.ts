import type { GameScrapeContext } from '../utils/context';
import type { Source } from '~scraper/utils/game';

export type SourcererOutput = Source;

export type SourcererOptions = {
  id: string;
  name: string; // displayed in the UI
  rank: number; // the higher the number, the earlier it gets put on the queue
  disabled?: boolean;
  scrape: (input: GameScrapeContext) => Promise<SourcererOutput>;
};

export type Sourcerer = SourcererOptions & {
  type: 'source';
  disabled: boolean;
};

export function makeSourcerer(state: SourcererOptions): Sourcerer {
  return {
    ...state,
    type: 'source',
    disabled: state.disabled ?? false
  };
}
