import { Sort } from './sort';

export type PropertySortSelector<T> = (obj: T) => any;

export function compareObjectProperty<T = any>(selector: PropertySortSelector<T>, a: T, b: T): number {
  const va = selector(a);
  const vb = selector(b);
  return va < vb ? -1 : va > vb ? 1 : 0;
}

export class PropertySort<T = any> extends Sort<T> {
  constructor(readonly selector: PropertySortSelector<T>) {
    super((a: T, b: T) => compareObjectProperty(selector, a, b), 'ascending');
  }
}
