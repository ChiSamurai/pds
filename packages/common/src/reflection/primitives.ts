/**
 * Defines a primitive value of type {@link boolean}, {@link number}, {@link string}
 * or {@link symbol}, nothing more complex
 */
export type Primitive = boolean | number | string | symbol;

/**
 * Checks whether a given value is a {@link Primitive} or not
 *
 * @param obj The object value that should be checked
 */
export function isPrimitive(obj: any): obj is Primitive {
  const type = typeof obj;
  return type === 'boolean'
    || type === 'number'
    || type === 'string'
    || type === 'symbol';
}
