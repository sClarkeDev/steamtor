import { type PlasmoMessaging } from '@plasmohq/messaging';
import { Storage } from '@plasmohq/storage';

import { PROXY_URL } from '~constants';
import { runScraper } from '~scraper';

const getProxy = async (): Promise<string> => {
  const storage = new Storage();
  const result = (await storage.get('proxy')) || PROXY_URL;
  return result;
};

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const proxy = await getProxy();
  const source = await runScraper({ name: req.body.name }, proxy);
  res.send(source);
};

export default handler;
