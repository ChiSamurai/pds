
export function assertMultiProvider(obj: any, token: string): void | never {
  if (obj != null && !Array.isArray(obj)) throw new Error(
    `Invalid value given for multi provider ${token}. Expected an array value, ` +
    `but received "${obj}" instead. Please make sure to properly set the "multi: true" ` +
    `value when providing ${token}!`
  );
}
