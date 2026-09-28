import { sendMessage } from '~/messaging';
import { makeSiteScraper } from '~/sites';
import { cleanGameName } from '~/utils/game';

export default defineContentScript({
  matches: ['https://store.steampowered.com/app/*', 'https://www.cdkeys.com/pc/*'],
  allFrames: true,
  async main() {
    const siteScraper = makeSiteScraper(window.location.host);
    if (!siteScraper) return;

    const gameName = siteScraper.getGameName();
    if (!gameName) return;

    const cleanedGameName = cleanGameName(gameName);

    try {
      const source = await sendMessage('scrape', { name: cleanedGameName });

      if (source) {
        siteScraper.addDownloadButton({ name: gameName, cleanName: cleanedGameName }, source);
      }
    } catch (err) {
      console.log('Error running scraper:', err);
    }
  }
});
