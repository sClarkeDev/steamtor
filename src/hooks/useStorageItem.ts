import { useCallback, useEffect, useState } from 'react';

import type { WxtStorageItem } from '@wxt-dev/storage';

export function useStorageItem<T>(item: WxtStorageItem<T, Record<string, unknown>>): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(item.fallback);

  useEffect(() => {
    item.getValue().then(setValue);
    return item.watch(setValue);
  }, [item]);

  const set = useCallback(
    (next: T) => {
      setValue(next);
      item.setValue(next);
    },
    [item]
  );

  return [value, set];
}
