export type StringFormatValueSelector<T = any> = (obj: T) => string;

export interface StringFormatDescriptor<T = any> {
  [token: string]: StringFormatValueSelector<T>;
}

export function getStringFormat<T>(
  obj: T,
  format: string,
  formatDescriptor: StringFormatDescriptor<T>,
  fallbackObj?: T
): string {
  let str = format;
  for (const [token, valueSelector] of Object.entries(formatDescriptor)) {
    const regExp = new RegExp(token, 'g');
    if (regExp.test(format)) {
      const value =
        (obj != null && valueSelector(obj)) ||
        (fallbackObj != null && valueSelector(fallbackObj)) ||
        '';
      str = str.replace(regExp, value);
    }
  }
  return str;
}
