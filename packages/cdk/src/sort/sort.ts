import { SortOrder } from './sort-order';

export type ComparatorFn<T> = (a: T, b: T) => number;
export type SortComparatorFn<T> = (a: T, b: T, order: SortOrder) => number;

/* @dynamic */
export class Sort<T = any> {
  private _comparator: ComparatorFn<T>;
  private _defaultOrder: SortOrder;

  constructor(comparator: ComparatorFn<T>, defaultOrder: SortOrder) {
    this._comparator = comparator;
    this._defaultOrder = defaultOrder;
  }

  static noop(): Sort {
    return new Sort(() => 0, null);
  }

  setComparator(fn: ComparatorFn<T>, defaultOrder: SortOrder): void {
    if (fn != null) {
      this._comparator = fn;
      this._defaultOrder = defaultOrder;
    }
  }
  getComparator(): ComparatorFn<T> {
    return this._comparator;
  }

  getDefaultOrder(): SortOrder {
    return this._defaultOrder;
  }

  apply(data: Iterable<T>, order: SortOrder = this.getDefaultOrder()): T[] {
    const sortedData = Array.from(data).sort(this._comparator);
    const isDefaultOrder = this._defaultOrder === order;
    if (isDefaultOrder) return sortedData;
    else return sortedData.reverse();
  }

  protected getSortComparator(): SortComparatorFn<T> {
    return (a: T, b: T, order: SortOrder) => this._comparator(a, b) * (this._defaultOrder !== order ? -1 : 1);
  }
}
