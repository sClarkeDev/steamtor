export const compareNames = (name1: string, name2: string): boolean => {
  const normalize = (name: string): string => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '');
  };
  const normalizedOfficialName = normalize(name1);
  const normalizedWebName = normalize(name2);

  return normalizedWebName.includes(normalizedOfficialName);
};

export const isSubstringInArray = (array: string[], string: string) => {
  return array.some((substring) => string.includes(substring));
};
