import { DOMParser } from 'linkedom';

import { TRUSTED_UPLOADERS } from '~scraper/providers/uploaders';

import { isSubstringInArray } from '../../../utils/compare';
import { NotFoundError } from '../../../utils/errors';
import { type SourcererOutput, makeSourcerer } from '../../base';

import type { ScrapeResult } from './types';
import type { GameScrapeContext } from '../../../utils/context';

const BASE_URL = 'http://rutor.info';

const extractResults = (body: string): ScrapeResult[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(body, 'text/html');

  const resultsTable = doc.querySelector('div#index > table');
  if (!resultsTable) throw new NotFoundError('Results table not found.');

  const results: ScrapeResult[] = [];
  const rows = resultsTable.querySelectorAll('tr:not(:first-child)');

  rows.forEach((row) => {
    const gameName = row.querySelector('td > a:nth-child(3)')?.textContent;
    const magnet = row.querySelector('td > a:nth-child(2)')?.getAttribute('href');
    const torrent = row.querySelector('td > a.downgif')?.getAttribute('href');
    const seeders = row.querySelector('td:nth-child(5) span.green')?.textContent;
    const leechers = row.querySelector('td:nth-child(5) span.red')?.textContent;
    const seedRatio = Number(seeders) - Number(leechers);

    if (gameName && torrent && magnet && isSubstringInArray(TRUSTED_UPLOADERS, gameName.toLowerCase())) {
      results.push({ torrent, magnet, seedRatio });
    }
  });

  return results;
};

const findBestTorrent = (results: ScrapeResult[]): ScrapeResult => {
  if (results.length === 0) throw new NotFoundError('No valid torrents found.');

  return results.reduce((max, torrent) => (torrent.seedRatio > max.seedRatio ? torrent : max), results[0]);
};

const scrape = async (ctx: GameScrapeContext): Promise<SourcererOutput> => {
  const url = `${BASE_URL}/search/0/8/300/2/${encodeURIComponent(ctx.game.name)}`;
  const body = await ctx.fetcher(url);

  const results = extractResults(body);
  const bestTorrent = findBestTorrent(results);

  return {
    magnet: bestTorrent.magnet,
    torrent: bestTorrent.torrent
  };
};

export const rutorScraper = makeSourcerer({
  id: 'rutor',
  name: 'Rutor',
  rank: 1,
  scrape,
  disabled: false
});
