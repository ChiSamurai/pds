import { Inject, InjectionToken, NgModule, Pipe, PipeTransform } from '@angular/core';
import {
  ObjectPropertySelector,
  resolveObjectPropertySelector,
} from '../../reflection/resolve-object-property-selector';
import { getStringFormat } from '../../utils';

export interface FullNameFormatOptions {
  firstNameSelector: ObjectPropertySelector<any>;
  lastNameSelector: ObjectPropertySelector<any>;
  titleSelector: ObjectPropertySelector<any>;
  fallback?: any;
}

/**
 * Formats any object containing name information into a string. The string format can be provided
 * using the following tokens. If no format is present the pipe will default to "full". Additionally
 * any field can be backed up with a fallback value
 *
 * | Token  | Description                                                   | Example      |
 * | ------ | ------------------------------------------------------------- | ------------ |
 * |  `FF`  | The fully quantified first name of the person                 | Jane, John   |
 * |  `ff`  | Shortened first letter format of the first name of the person | J.           |
 * |  `LL`  | The fully quantified last name of the person                  | Doe          |
 * |  `ll`  | Shortened first letter format of the last name of the person  | D.           |
 * |  `TT`  | The title of the person                                       | Dr.          |
 *
 * There's also a predefined selection of format aliases to choose from:
 *
 * | Alias       | Format     | Example       |
 * | ----------- | ---------- | ------------- |
 * | `full`      | `TT FF LL` | Dr. Jane Doe  |
 * | `short`     | `ff LL`    | J. Doe        |
 * | `shortLast` | `FF ll`    | Jane D.       |
 * | `reversed`  | `LL, FF`   | Doe, Jane     |
 *
 * @param obj     The object value to select the name information from
 * @param format  The desired format to use for the output string value. Defaults to "full"
 * @param options Optional parameters that can be used during the format operation
 */
export function formatFullName(obj: any, format: string = 'full', options?: FullNameFormatOptions): string {
  const {
    firstNameSelector = (o) => o.firstName,
    lastNameSelector = (o) => o.lastName,
    titleSelector = (o) => o.title,
  } = options;

  switch (format) {
    case 'short':
      format = 'ff LL';
      break;
    case 'shortLast':
      format = 'FF ll';
      break;
    case 'full':
      format = 'TT FF LL';
      break;
    case 'reversed':
      format = 'LL, FF';
      break;
  }

  return getStringFormat(
    obj,
    format,
    {
      // first first name letter including a dot:
      ff: (o) => `${resolveObjectPropertySelector(o, firstNameSelector)?.charAt(0) || ''}.`,
      // first last name letter including a dot:
      ll: (o) => `${resolveObjectPropertySelector(o, lastNameSelector)?.charAt(0) || ''}.`,
      // first name:
      FF: (o) => `${resolveObjectPropertySelector(o, firstNameSelector) || ''}`,
      // last name:
      LL: (o) => `${resolveObjectPropertySelector(o, lastNameSelector) || ''}`,
      // title
      TT: (o) => `${resolveObjectPropertySelector(o, titleSelector) || ''}`,
    },
    options?.fallback
  );
}

export const FULL_NAME_FORMAT = new InjectionToken<string>('FULL_NAME_FORMAT', {
  providedIn: 'root',
  factory: /* @dynamic */ () => 'full',
});
export const FULL_NAME_FORMAT_OPTIONS = new InjectionToken<FullNameFormatOptions>('FULL_NAME_FORMAT_OPTIONS', {
  providedIn: 'root',
  factory: /* @dynamic */ () => ({
    firstNameSelector: (o) => o.firstName,
    lastNameSelector: (o) => o.lastName,
    titleSelector: (o) => o.title,
  }),
});

@Pipe({ name: 'fullName' })
export class FullNamePipe implements PipeTransform {
  constructor(
    @Inject(FULL_NAME_FORMAT) readonly format: string,
    @Inject(FULL_NAME_FORMAT_OPTIONS) readonly options: FullNameFormatOptions
  ) {}

  transform(obj: any, format: string = this.format, options: FullNameFormatOptions = this.options): string {
    return formatFullName(obj, format, options);
  }
}

@NgModule({
  declarations: [FullNamePipe],
  exports: [FullNamePipe],
})
export class FullNamePipeModule {}
