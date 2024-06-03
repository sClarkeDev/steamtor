import { gatherAllSources } from '../providers/all';
import { reorderOnIdList } from '../utils/list';

import type { UseableFetcher } from '../fetchers/types';
import type { SourcererOutput } from '../providers/base';
import type { ScrapeContext } from '../utils/context';
import type { GameInfo, Source } from '../utils/game';

export type RunOutput = Source;

export type ProviderRunnerOptions = {
  fetcher: UseableFetcher;
  sourceOrder?: string[];
  game: GameInfo;
};

export async function runAllProviders(ops: ProviderRunnerOptions): Promise<RunOutput | null> {
  const list = gatherAllSources();
  const sources = reorderOnIdList(ops.sourceOrder ?? [], list);

  const contextBase: ScrapeContext = {
    fetcher: ops.fetcher
  };

  let result: RunOutput | null = null;

  for (const s of sources) {
    let output: SourcererOutput | null = null;
    try {
      output = await s.scrape({
        ...contextBase,
        game: ops.game
      });
    } catch (err) {
      console.error(err);
      continue;
    }
    if (output) {
      result = output;
      break;
    }
  }

  return result;
}
