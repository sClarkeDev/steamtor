import { makeFetcher } from './fetchers/common';
import { makeSimpleProxyFetcher } from './fetchers/simpleProxy';
import { makeStandardFetcher } from './fetchers/standardFetch';
import { runAllProviders } from './runners/runner';

import type { GameInfo, Source } from './utils/game';

export const runScraper = async (game: GameInfo, proxy?: string): Promise<Source | null> => {
  const fetcher = proxy ? makeFetcher(makeSimpleProxyFetcher(proxy, fetch)) : makeFetcher(makeStandardFetcher(fetch));

  const providerRunnerOps = {
    fetcher,
    game
  };

  const source = await runAllProviders(providerRunnerOps);
  return source;
};
