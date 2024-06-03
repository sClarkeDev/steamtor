import type { UseableFetcher } from '~scraper/fetchers/types';

export const validateUrl = async (url: string, fetcher: UseableFetcher): Promise<string | null> => {
  const result = await fetcher(url);
  if (result.statusCode < 200 || result.statusCode >= 400) return null;
  return url;
};
