import { DOMParser } from 'linkedom';

import { compareNames } from '~scraper/utils/compare';

import { NotFoundError } from '../../../utils/errors';
import { type SourcererOutput, makeSourcerer } from '../../base';

import type { GameScrapeContext } from '../../../utils/context';

const BASE_URL = 'https://fitgirl-repacks.site';

const search = async (ctx: GameScrapeContext): Promise<string> => {
  const url = `${BASE_URL}?s=${ctx.game.name.replaceAll(' ', '+')}`;
  const body = await ctx.fetcher(url);

  const parser = new DOMParser();
  const doc = parser.parseFromString(body, 'text/html');

  const results = doc.querySelectorAll('div#content article');
  if (!results.length) throw new NotFoundError();

  let result = null;

  results.forEach((r) => {
    const title = r.querySelector('.entry-title > a');
    const name = title?.textContent as string;
    const path = title?.getAttribute('href') as string;

    if (compareNames(ctx.game.name, name)) {
      result = path;
    }
  });

  if (!result) throw new NotFoundError();

  return result;
};

const getSource = async (ctx: GameScrapeContext, url: string) => {
  const pageRes = await ctx.fetcher(url);

  const parser = new DOMParser();
  const pageDoc = parser.parseFromString(pageRes, 'text/html');

  const hosts = pageDoc.querySelectorAll('div.entry-content > ul:nth-of-type(2) > li');
  if (!hosts) throw new NotFoundError();

  const host = hosts[0];

  const links = host.querySelectorAll('a');

  let torrent: string | null = null;
  let magnet: string | undefined;
  for (const link of links) {
    const path = link.getAttribute('href') as string;
    const text = link.textContent;
    if (text === 'magnet') {
      magnet = path;
    } else if (text?.includes('torrent file only')) {
      torrent = path;
    }
  }

  if (!torrent) throw new NotFoundError();

  return {
    torrent,
    magnet
  };
};

const scrape = async (ctx: GameScrapeContext): Promise<SourcererOutput> => {
  const pageUrl = await search(ctx);
  const source = await getSource(ctx, pageUrl);

  return source;
};

export const fitgirlScraper = makeSourcerer({
  id: 'fitgirl',
  name: 'Fitgirl',
  rank: 50,
  scrape,
  disabled: false
});
