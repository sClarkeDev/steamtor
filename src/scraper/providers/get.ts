import { hasDuplicates } from '~utils/predicates';

import type { Sourcerer } from './base';

export interface ProviderList {
  sources: Sourcerer[];
}

export function getProviders(list: ProviderList): ProviderList {
  const sources = list.sources.filter((v) => !v?.disabled);
  const combined = [...sources];

  const anyDuplicateId = hasDuplicates(combined.map((v) => v.id));
  const anyDuplicateSourceRank = hasDuplicates(sources.map((v) => v.rank));

  if (anyDuplicateId) throw new Error('Duplicate id found in sources/embeds');
  if (anyDuplicateSourceRank) throw new Error('Duplicate rank found in sources');

  return {
    sources
  };
}
