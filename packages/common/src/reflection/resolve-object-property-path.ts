export function resolveObjectPropertyPath(obj: any, propertyPath: string[] | string, fallback?: any): any {
  const path = (typeof propertyPath === 'string' ? propertyPath.split('.') : propertyPath) || [];
  return (
    obj != null &&
    path.reduce((innerObj, nextProperty) => {
      return innerObj.hasOwnProperty(nextProperty) ? innerObj[nextProperty] : fallback;
    }, obj)
  );
}
