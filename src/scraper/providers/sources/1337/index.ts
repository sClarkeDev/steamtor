import { DOMParser } from 'linkedom';

import { TRUSTED_UPLOADERS } from '~scraper/providers/uploaders';
import { validateUrl } from '~scraper/utils/valid';

import { NotFoundError } from '../../../utils/errors';
import { type SourcererOutput, makeSourcerer } from '../../base';

import type { GameScrapeContext } from '../../../utils/context';

const BASE_URL = 'https://1337x.to';

const search = async (ctx: GameScrapeContext): Promise<string> => {
  const url = `${BASE_URL}/sort-category-search/${encodeURIComponent(ctx.game.name)}/Games/seeders/desc/1/`;
  const body = await ctx.fetcher(url);

  const parser = new DOMParser();
  const doc = parser.parseFromString(body, 'text/html');

  const resultsTable = doc.querySelector('.table-list tbody');
  if (!resultsTable) throw new NotFoundError();

  const results: { url: string; seedRatio: number }[] = [];
  const rows = resultsTable.querySelectorAll('tr:not(:first-child)');
  rows.forEach((row) => {
    const nameLinks = row.querySelectorAll('td.name a');
    const seeders = row.querySelector('.seeds')?.textContent;
    const leachers = row.querySelector('.leeches')?.textContent;
    const seedRatio = Number(seeders) - Number(leachers);
    const uploader = row.querySelector('td.vip a')?.textContent?.toLowerCase();
    const pageUrl = `${BASE_URL}${nameLinks[1]?.getAttribute('href')}`;

    if (url && uploader && TRUSTED_UPLOADERS.includes(uploader)) {
      results.push({
        url: pageUrl,
        seedRatio
      });
    }
  });

  if (!results.length) throw new NotFoundError();

  const bestTorrent = results.reduce((max, torrent) => (torrent.seedRatio > max.seedRatio ? torrent : max), results[0]);

  return bestTorrent.url;
};

const getSource = async (ctx: GameScrapeContext, url: string) => {
  const pageRes = await ctx.fetcher(url);

  const parser = new DOMParser();
  const pageDoc = parser.parseFromString(pageRes, 'text/html');

  const torrents = pageDoc.querySelectorAll('ul.dropdown-menu > li > a');

  let torrent: string | null = null;
  for (const t of torrents) {
    const torrentUrl = t?.getAttribute('href');
    if (!torrentUrl || torrentUrl.startsWith('magnet')) continue;

    torrent = await validateUrl(torrentUrl, ctx.fetcher);
    if (torrent) {
      break;
    }
  }
  if (!torrent) throw new NotFoundError();

  const magnet = pageDoc.querySelector('div.no-top-radius > div > ul > li:first-child > a')?.getAttribute('href');

  return {
    torrent,
    magnet: magnet || undefined
  };
};

const scrape = async (ctx: GameScrapeContext): Promise<SourcererOutput> => {
  const pageUrl = await search(ctx);
  const source = await getSource(ctx, pageUrl);

  return source;
};

export const oneThreeSevenSevenScraper = makeSourcerer({
  id: '1337',
  name: '1337',
  rank: 99999,
  scrape,
  disabled: false
});
