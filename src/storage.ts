import { storage } from '@wxt-dev/storage';

import { PROXY_URL } from '~/constants';

export const proxyItem = storage.defineItem<string>('local:proxy', {
  fallback: PROXY_URL
});
