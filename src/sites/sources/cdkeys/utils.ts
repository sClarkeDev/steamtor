const monthMap: { [key: string]: number } = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sept: 8,
  oct: 9,
  nov: 10,
  dec: 11
};

export const isReleased = (): boolean => {
  const releaseDateStr = document.querySelector('div.product.release_date > div')?.textContent;
  if (!releaseDateStr) return false;

  const [day, month, year] = releaseDateStr.split(' ');

  console.log(parseInt(year, 10), monthMap[month.toLowerCase()], parseInt(day, 10));
  const releaseDate = new Date(parseInt(year, 10), monthMap[month] || 0, parseInt(day, 10));
  const currentDate = new Date();

  return releaseDate <= currentDate;
};
