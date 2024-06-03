export const cleanGameName = (name: string): string => {
  return name
    .trim()
    .toLowerCase()
    .replace(/['_™]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, ' ');
};
