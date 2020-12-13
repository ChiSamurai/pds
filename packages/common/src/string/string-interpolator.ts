import { Inject, Injectable, InjectionToken } from '@angular/core';
import { resolveObjectPropertyPath } from '../reflection/resolve-object-property-path';
import { UNIX_VAR_INTERPOLATION_SCHEME } from './string-interpolation-schemes';

/**
 * Describes a {@link RegExp} that matches and discovers context property names from a string. The
 * expression should bind the reference to the first captured group. It will always be executed
 * with a global `g` flag.
 *
 * @remarks See {@link STRING_INTERPOLATION_SCHEME} summary for more information
 */
export type StringInterpolationScheme = RegExp;

/**
 * The {@link StringInterpolationScheme} used during the {@link StringInterpolator.interpolate}
 * operation. By default this regular expression will match any common unix environment variable
 * notation styled values in the form of `$parameter` while capturing the actual "context" property
 * name `parameter` inside the first expression group
 */
export const STRING_INTERPOLATION_SCHEME = new InjectionToken<StringInterpolationScheme>('STRING_INTERPOLATION_SCHEME', {
  providedIn: 'root', factory: /* @dynamic */ () => UNIX_VAR_INTERPOLATION_SCHEME
});

/** The {@link StringInterpolationReplaceFn} used during string interpolation operations */
export type StringInterpolationReplaceFn = (params: any, match: string, ...groups: string[]) => string;

/**
 * The {@link StringInterpolationReplaceFn} used during the {@link StringInterpolator.interpolate}
 * operation. By default the replacer will exchange
 */
export const STRING_INTERPOLATION_REPLACER = new InjectionToken<StringInterpolationReplaceFn>('STRING_INTERPOLATION_REPLACER', {
  providedIn: 'root', factory: /* @dynamic */ () => (params, match, group1) => {
    // returning the context field for the first captured group value only if
    // there is a first captured group, it's a string and exists inside the
    // given context object scope
    if (group1 && typeof group1 === 'string' && group1 in params) {
      // lets also make sure to resolve any potentially existing object property path reference
      return resolveObjectPropertyPath(params, group1);
    } else return match;
  }
});

@Injectable({ providedIn: 'root' })
export class StringInterpolator {

  constructor(
    @Inject(STRING_INTERPOLATION_SCHEME)
    readonly interpolationScheme: /* @dynamic */ StringInterpolationScheme,
    @Inject(STRING_INTERPOLATION_REPLACER)
    protected readonly replacer: /* @dynamic */ StringInterpolationReplaceFn
  ) {
    // we definitely want to enforce the global flag for the interpolation scheme as we might have
    // to replace multiple occurrences of the desired matches, but only if it's not already present
    if (!interpolationScheme.global) {
      const { source, flags } = interpolationScheme;
      this.interpolationScheme = new RegExp(source, `g${flags}`);
    }
  }

  /**
   * Interpolates a given string value with any given context object. This
   * operation uses the provided {@link STRING_INTERPOLATION_SCHEME} expression to
   * properly discover and replace target values as desired
   *
   * @param value    The string value that should be interpolated
   * @param params   The context to use for the interpolation resolution
   * @param scheme   Optional {@link StringInterpolationScheme} to use for the interpolation
   * @param replacer Optional {@link StringInterpolationReplaceFn} to use for the interpolation
   */
  interpolate(value: string, params: any, scheme = this.interpolationScheme, replacer = this.replacer): string {
    return params != null
      ? value?.replace(scheme, (match, ...groups) => replacer(params, match, ...groups))
      : value;
  }

}
