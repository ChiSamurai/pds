import { Injectable } from '@angular/core';
import { SortState } from './sort-model';
import { parseSortOrder } from './sort-order';

@Injectable({ providedIn: 'root' })
export class SortParamParser {
  parseParam(value: string): SortState | null {
    if (value == null) return null;
    else {
      const [key, order] = value.split(',');
      return {
        key,
        order: parseSortOrder(order),
      };
    }
  }
}
