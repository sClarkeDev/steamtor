import { isReleased } from './utils';
import { makeSite } from '../../base';
import { NotFoundError } from '../../utils/errors';

import type { GameInfoExtended, Source } from '~scraper/utils/game';

const BASE_URL = 'www.cdkeys.com';

const removeDownloadButton = () => {
  const buttons = document.querySelectorAll('.steamtor-download');
  buttons.forEach((button) => {
    button.remove();
  });
};

const getGameName = (): string => {
  const gameNameElement = document.querySelector('.page-title');
  if (!gameNameElement?.textContent) throw new NotFoundError('Could not get game name');
  if (gameNameElement.textContent.includes('- DLC')) throw new Error('This is not a game.');
  if (!isReleased()) throw new Error('Game is not released yet.');

  const cleaned = gameNameElement.textContent.replace(/ PC .+?$/, '').trim();
  return cleaned;
};

const addDownloadButton = (game: GameInfoExtended, source: Source) => {
  removeDownloadButton();

  const downloadButtonHTML = `<a href="${source.torrent}" title="Torrent" class="action primary tocart green steamtor-download" style="margin-bottom:15px;"><span>Torrent</span></a>`;
  const magnetButtonHTML = `<a href="${source.magnet}" title="Magnet" class="action primary blue steamtor-download" style="margin-bottom:15px;"><span>Magnet</span></a>`;

  const purchaseSection = document.querySelector('div.box-tocart .actions');

  if (magnetButtonHTML) {
    purchaseSection?.insertAdjacentHTML('afterbegin', magnetButtonHTML);
  }
  purchaseSection?.insertAdjacentHTML('afterbegin', downloadButtonHTML);
};

export const cdkeysSite = makeSite({
  id: 'cdkeys',
  name: 'CD Keys',
  host: BASE_URL,
  getGameName,
  addDownloadButton
});
