export function resolveObjectPropertyPath(obj: any, propertyPath: string[] | string, fallback?: any): any {
  const path = (typeof propertyPath === 'string' ? propertyPath.split('.') : propertyPath) || [];
  return (
    obj != null &&
    path.reduce((innerObj, nextProperty) => {
      // eslint-disable-next-line no-prototype-builtins
      return innerObj.hasOwnProperty(nextProperty) ? innerObj[nextProperty] : fallback;
    }, obj)
  );
}
