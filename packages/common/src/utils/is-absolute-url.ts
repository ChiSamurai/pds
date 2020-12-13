export function isAbsoluteURL(url: string): boolean {
  return url && (url.indexOf('://') > 0 || url.indexOf('//') === 0);
}
