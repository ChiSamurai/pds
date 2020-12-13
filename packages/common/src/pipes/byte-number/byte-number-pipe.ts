import { formatNumber } from '@angular/common';
import { Inject, InjectionToken, LOCALE_ID, NgModule, Pipe, PipeTransform } from '@angular/core';
import { getStringFormat } from '../../utils';

export type ByteNumberUnit = 'B' | 'kB' | 'MB' | 'GB' | 'TB' | 'PT';

export function getByteNumberUnitBreakpoints(): Record<ByteNumberUnit, number> {
  const pow = (v, p) => Array(p).fill(v).reduce((r, n) => r * n, 1);
  return {
    PT: pow(1024, 5),
    TB: pow(1024, 4),
    GB: pow(1024, 3),
    MB: pow(1024, 2),
    kB: 1024,
    B: 1
  };
}

export function getByteNumberUnitNames(): Record<ByteNumberUnit, string> {
  return {
    PT: 'Petabyte',
    TB: 'Terabyte',
    GB: 'Gigabyte',
    MB: 'Megabyte',
    kB: 'Kilobyte',
    B: 'Byte'
  };
}
export function getByteNumberUnitPluralNames(): Record<ByteNumberUnit, string> {
  return Object.entries(getByteNumberUnitNames())
    .reduce((names, [ key, singularName ]) => ({ ...names, [ key ]: `${singularName}s` }), {} as any);
}

/**
 * Transforms a given size value into a string. The format of the output string
 * can also be customized using the same digit info format as used when calling
 * the {@link formatNumber} function.
 *
 * ```
 * {minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}
 * ```
 *
 * Additionally the output of the unit of the string can be adjusted using the
 * following tokens as described. However the format must always start with a
 * valid digit info format as it basically gets split and passed on to another
 * implementation!
 *
 * | Token  | Description                     | Example   |
 * |:------ |:------------------------------- |:--------- |
 * | `UU`   | Full length unit name           | Kilobytes |
 * | `uu`   | Unit name abbreviation          | kB        |
 *
 * @param value  The number of bytes that is expected to be formatted into a readable string
 * @param locale The locale used for the number formatting
 * @param format The format to expect of the output (eg. '1.0-2 uu')
 * @param unit   Optional {@link ByteNumberUnit} the output should be display in. If not
 *               provided, the breakpoint for the respective units will be used to auto-
 *               format the expected unit (eg. `1024` will be formatted to `1 kB`, given
 *               the default format is used, since `1024 >= kB`)
 */
export function formatByteNumber(value: number, locale: string, format: string, unit?: ByteNumberUnit): any {
  const breakpoints = getByteNumberUnitBreakpoints();
  const pluralNames = getByteNumberUnitPluralNames();
  const singularNames = getByteNumberUnitNames();
  const [ digitInfo, unitFormat ] = format.split(/\s+/);

  if (unit != null) {
    const singularName = singularNames[ unit ];
    const pluralName = pluralNames[ unit ];
    const bp = breakpoints[ unit ];
    const n = value / bp;

    const nStr = formatNumber(n, locale, digitInfo);
    return getStringFormat(null, `${nStr} ${unitFormat}`, {
      UU: () => n === 1 ? singularName : pluralName,
      uu: () => unit
    });
  } else {
    for (const [ unitName, unitBp ] of Object.entries(breakpoints)) {
      if (value >= unitBp)
        return formatByteNumber(value, locale, format, unitName as ByteNumberUnit);
    }
  }
}

export const BYTE_NUMBER_FORMAT = new InjectionToken<string>('BYTE_NUMBER_FORMAT', {
  providedIn: 'root', factory: /* @dynamic */ () => '1.0-2 uu'
});

@Pipe({ name: 'byteNumber' })
export class ByteNumberPipe implements PipeTransform {
  constructor(
    @Inject(LOCALE_ID) readonly locale: string,
    @Inject(BYTE_NUMBER_FORMAT) readonly format?: string
  ) {
  }

  transform(bytes: number, format: string = this.format, unit?: ByteNumberUnit): string {
    return formatByteNumber(bytes, this.locale, format, unit);
  }
}

@NgModule({
  declarations: [ ByteNumberPipe ],
  exports: [ ByteNumberPipe ]
})
export class ByteNumberPipeModule {
}
