import { defineExtensionMessaging } from '@webext-core/messaging';

import type { Source } from '~/scraper/utils/game';

type ProtocolMap = {
  scrape(data: { name: string }): Source | null;
};

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
