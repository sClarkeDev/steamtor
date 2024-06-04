import { sendToBackground } from '@plasmohq/messaging';

import { makeSiteScraper } from '~sites';
import { cleanGameName } from '~utils/game';

import type { PlasmoCSConfig } from 'plasmo';

(async () => {
  const siteScraper = makeSiteScraper(window.location.host);
  if (!siteScraper) return;

  const gameName = siteScraper.getGameName();
  if (!gameName) return;

  const cleanedGameName = cleanGameName(gameName);

  try {
    const source = await sendToBackground({
      name: 'scrape',
      body: {
        name: cleanedGameName
      }
    });

    if (source) {
      siteScraper.addDownloadButton({ name: gameName, cleanName: cleanedGameName }, source);
    }
  } catch (err) {
    console.log('Error running scraper:', err);
  }
})();

export const config: PlasmoCSConfig = {
  matches: ['https://store.steampowered.com/app/*', 'https://www.cdkeys.com/pc/*'],
  all_frames: true
};
