import { Predicate } from '@angular/core';

export function traverse<T = any>(
  obj: T,
  nextObjSelector: (obj: T) => any,
  predicate: Predicate<T> = o => o != null
): T {
  const nextObj = nextObjSelector(obj);

  if (nextObj != null && !predicate(nextObj))
    return traverse(nextObj, nextObjSelector, predicate);
  else return nextObj;
}
