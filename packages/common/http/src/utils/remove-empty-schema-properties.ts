
export type RemoveEmptySchemaPropertyTarget = 'emptyString' | 'emptyArray' | 'emptyObject' | 'nullOrUndefined';
export interface RemoveEmptySchemaPropertyOptions {
  ignore?: Array<RemoveEmptySchemaPropertyTarget> | RemoveEmptySchemaPropertyTarget;
}
/**
 * Removes all "empty" properties from the given schema object and returns the "compressed" value. The "empty" condition
 * is given for any `null`, `undefined`, empty string, array or object value, given it is not ignored by the
 * {@link RemoveEmptySchemaPropertyOptions.ignore} option
 *
 * @remarks Please note that this utility function is designed to support non-instantiated objects only, meaning that
 *  dynamic references like class instances and their functions won't be preserved during the removal process
 *
 * @param objOrArray The schema object value that should be "compressed"
 * @param [options]  Optional configuration interface
 */
export function removeEmptySchemaProperties<T>(objOrArray: T, options?: RemoveEmptySchemaPropertyOptions): Partial<T> {
  const ignore = options?.ignore;
  const isArrayAcc = Array.isArray(objOrArray);
  return objOrArray != null && Object.entries(objOrArray).reduce((accObjOrArray, [ key, value ]) => {
    // pre check whether the value is empty and should be removed already
    if (shouldRemoveProperty(value, options))
      return accObjOrArray;
    // if we are dealing with a nested schema value, try to recursively remove all empty properties
    if (Array.isArray(value) || typeof value === 'object')
      value = removeEmptySchemaProperties(value, options);
    // re check whether the value should be removed after the recursive resolution
    if (shouldRemoveProperty(value, options))
      return accObjOrArray;
    // finally re-construct the array or object accumulator value
    if (isArrayAcc) return [ ...accObjOrArray as any[], value ];
    else return { ...accObjOrArray as any, [ key ]: value };
  }, isArrayAcc ? [] : {});
}

/** @internal */
function shouldRemoveProperty(value: any, options?: RemoveEmptySchemaPropertyOptions): boolean {
  const ignore = options?.ignore;

  const isNullOrUndefined = value == null;
  const isEmptyString = typeof value === 'string' && value.trim() === '';
  const isEmptyArray = Array.isArray(value) && value?.length === 0;
  const isEmptyObj = !isNullOrUndefined && typeof value === 'object' && Object.entries(value).length === 0;

  return isNullOrUndefined && ignore !== 'nullOrUndefined' &&  !ignore?.includes('nullOrUndefined')
    || isEmptyString && ignore !== 'emptyString' && !ignore?.includes('emptyString')
    || isEmptyArray && ignore !== 'emptyArray' && !ignore?.includes('emptyArray')
    || isEmptyObj && ignore !== 'emptyObject' && !ignore?.includes('emptyObject');
}
