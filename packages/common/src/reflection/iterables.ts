/** Extracts the type of an {@link Iterable} entry by inference */
export type ExtractIteratorResult<T> = T extends Iterable<infer U> ? U : never;

/** Checks whether a given object is an {@link Iterable} implementation */
export function isIterable(obj: any): obj is Iterable<any> {
  return obj != null && typeof obj[Symbol.iterator] === 'function';
}
