import { StringInterpolationScheme } from './string-interpolator';

/**
 * A url {@link StringInterpolationScheme} expression that will match any common url parameter
 * notation styled values in the form of `:parameter` while capturing the actual "context" property
 * name `parameter` inside the first expression group
 */
export const URL_PARAM_INTERPOLATION_SCHEME: StringInterpolationScheme = /:([a-z0-9_\-.]+)/i;

/**
 * A unix {@link StringInterpolationScheme} expression that will match any common unix variable
 * notation styled values in the form of `$parameter` while capturing the actual "context" property
 * name `parameter` inside the first expression group
 */
export const UNIX_VAR_INTERPOLATION_SCHEME: StringInterpolationScheme = /\$([a-z0-9_]+)/i;
/**
 * A DOS {@link StringInterpolationScheme} expression that will match any common DOS variable
 * notation styled values in the form of `%parameter%` while capturing the actual "context" property
 * name `parameter` inside the first expression group
 */
export const DOS_VAR_INTERPOLATION_SCHEME: StringInterpolationScheme = /%([a-z0-9_]+)%/i;
