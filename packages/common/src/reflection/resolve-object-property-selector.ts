import { resolveObjectPropertyPath } from './resolve-object-property-path';

export type ObjectPropertySelector<T> = ((obj: T) => any) | string[] | string;

export function resolveObjectPropertySelector<T = any>(
  obj: T,
  propertySelector: ObjectPropertySelector<T>,
  fallback?: any
): any {
  return typeof propertySelector !== 'function'
    ? resolveObjectPropertyPath(obj, propertySelector, fallback)
    : propertySelector(obj) || fallback;
}
