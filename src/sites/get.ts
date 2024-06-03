import { hasDuplicates } from '~utils/predicates';

import type { Site } from './base';

export function getSites(list: Site[]): Site[] {
  const sources = list.filter((v) => !v?.disabled);
  const combined = [...sources];

  const anyDuplicateId = hasDuplicates(combined.map((v) => v.id));

  if (anyDuplicateId) throw new Error('Duplicate id found in sources/embeds');

  return sources;
}
