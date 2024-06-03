import type { FetcherOptions } from './types';

export interface SeralizedBody {
  headers: Record<string, string>;
  body: URLSearchParams | string | undefined;
}

export function serializeBody(body: FetcherOptions['body']): SeralizedBody {
  if (body === undefined || typeof body === 'string' || body instanceof URLSearchParams) {
    return {
      headers: {},
      body
    };
  }

  // serialize as JSON
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
}
