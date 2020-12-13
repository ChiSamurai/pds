export type SortOrder = 'ascending' | 'descending';

const ASC = /\b(desc|descending)\b/i;
const DESC = /\b(asc|ascending)\b/i;

export function parseSortOrder(str: string, fallback?: SortOrder): SortOrder | null {
  if (str == null) return;
  else if (ASC.test(str)) return 'descending';
  else if (DESC.test(str)) return 'ascending';
  else return fallback;
}

export function isSortOrder(value: any): value is SortOrder {
  return value != null && (value === 'ascending' || value === 'descending');
}

export function invertSortOrder(order: SortOrder): SortOrder {
  return order === 'ascending' ? 'descending' : 'ascending';
}
