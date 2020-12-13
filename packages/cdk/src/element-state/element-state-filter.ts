import { Predicate } from '@angular/core';

export type ElementStateFilter = Predicate<Event>;

export namespace ElementStateFilters {

  export function targetInsideOf(elementNode: Node): ElementStateFilter {
    return e => (elementNode).contains(e.target as Node);
  }

  export function targetOutsideOf(elementNode: Node): ElementStateFilter {
    return e => !targetInsideOf(elementNode)(e);
  }

}
