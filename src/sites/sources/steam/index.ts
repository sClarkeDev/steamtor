import { makeSite } from '../../base';
import { NotFoundError } from '../../utils/errors';

import type { GameInfoExtended, Source } from '~scraper/utils/game';

const BASE_URL = 'store.steampowered.com';

const removeDownloadButton = () => {
  const button = document.getElementById('steamtor-download');
  if (button) {
    button.remove();
  }
};

const getGameName = (): string => {
  const gameNameElement = document.getElementById('appHubAppName');
  if (!gameNameElement?.textContent) throw new NotFoundError('Could not get game name');

  return gameNameElement.textContent;
};

const addDownloadButton = (game: GameInfoExtended, source: Source) => {
  removeDownloadButton();

  const downloadButtonHTML = `
  <div id="steamtor-download" class="game_area_purchase_game_wrapper">
    <div class="game_area_purchase_game">
      <h1>Download ${game.name}</h1>
      <div class="game_purchase_action">
        ${
          source.magnet &&
          `
          <div class="game_purchase_action_bg">
            <div class="btn_addtocart btn_packageinfo">
              <a class="btn_blue_steamui btn_medium" href="${source.magnet}">
                <span>Magnet</span>
              </a>
            </div>
          </div>`
        }
        <div class="game_purchase_action_bg">
          <div class="btn_addtocart">
            <a data-panel='{"focusable":true,"clickOnActivate":true}' class="btn_green_steamui btn_medium" href="${source.torrent}">
              <span>Torrent</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

  const purchaseSection = document.getElementById('game_area_purchase');
  purchaseSection?.insertAdjacentHTML('afterbegin', downloadButtonHTML);
};

export const steamSite = makeSite({
  id: 'steam',
  name: 'Steam',
  host: BASE_URL,
  getGameName,
  addDownloadButton
});
