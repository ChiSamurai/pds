import { Predicate } from '@angular/core';

/**
 * Traverses an object instance based on a "next" selector function. The traverse operation recursively continues
 * until it either hits a `null` or `undefined` "next" value or an optionally also providable "break" predicate
 * function will return a truthy result
 *
 * @param obj             The object instance to traverse through
 * @param nextObjSelector The "next" value selector function
 * @param breakPredicate  Optional predicate to break the traversal operation with
 */
export function traverse<T = any>(obj: T, nextObjSelector: (obj: T) => any, breakPredicate?: Predicate<T>): T {
  const nextObj = nextObjSelector(obj);

  if (nextObj != null && !breakPredicate?.(nextObj)) return traverse(nextObj, nextObjSelector, breakPredicate);
  else return nextObj || obj;
}
