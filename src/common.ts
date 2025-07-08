export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export function formatDateToMonthYear(isoDate: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  }).format(new Date(isoDate));
}

export function pluralizeWord(count: number, singular: string): string {
  return count === 1 ? singular : `${singular}s`;
}

export function getRatingWidth(rating: number): string {
  return `${Math.round(rating) * 20}%`;
}
