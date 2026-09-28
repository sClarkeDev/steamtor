import { onMessage } from '~/messaging';
import { runScraper } from '~/scraper';
import { proxyItem } from '~/storage';

export default defineBackground(() => {
  onMessage('scrape', async ({ data }) => {
    const proxy = await proxyItem.getValue();
    return runScraper({ name: data.name }, proxy);
  });
});
