export function normalizeUrl(...segments: string[]): string {
  const isAbsoluteUrl = segments.some(segment => segment.includes('://'));
  // replace any multi slash (/) appearance w/ a single slash character
  const url = segments.join('/').replace(/\/+/g, '/');
  // checks whether the url was an absolute url before the normalization
  // operation and if so, replaces the first occurrence of ":/" with "://"
  // to properly preserve any protocol relation
  return isAbsoluteUrl ? url.replace(/:\//, '://') : url;
}
