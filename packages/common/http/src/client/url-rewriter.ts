import { Injectable } from '@angular/core';
import { normalizeUrl, StringInterpolator, URL_PARAM_INTERPOLATION_SCHEME } from '@vitagroup/common';


@Injectable({ providedIn: 'root' })
export class UrlRewriter {

  constructor(protected interpolator: StringInterpolator) {
  }

  /**
   * Rewrites and interpolates a given url string value with a defaultRewrite value. If
   * the defaultRewrite starts with a leading `/` than the previous url will be fully
   * overwritten by the new value, preserving the old url value inside a `url`
   * context field. This field can be overwritten within the context parameter.
   * If the url doesn't get overwritten, the defaultRewrite value is going to be append
   * to the given url value
   *
   * @param url      The "old" url value that should be rewritten
   * @param rewrite  The defaultRewrite value to overwrite or join the url value with
   * @param [params] Optional context value to use for interpolation
   */
  rewrite(url: string, rewrite: string, params?: any): string {
    if (rewrite.startsWith('/'))
      return this.interpolate(rewrite, { url, ...params });
    else {
      const nUrl = normalizeUrl(url, rewrite);
      return this.interpolate(nUrl, params);
    }
  }

  /**
   * Interpolates a given url string value with any given context object. This
   * operation uses the {@link StringInterpolator} in combination with the
   * {@link URL_PARAM_INTERPOLATION_SCHEME} to interpolate url values
   *
   * @param url    The url value that should be interpolated
   * @param params The context to use for the interpolation resolution
   */
  interpolate(url: string, params: any): string {
    return this.interpolator.interpolate(url, params, URL_PARAM_INTERPOLATION_SCHEME);
  }

}
