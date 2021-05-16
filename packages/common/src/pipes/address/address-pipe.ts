import { InjectionToken, NgModule, Pipe, PipeTransform } from '@angular/core';
import { getStringFormat, ObjectPropertySelector, resolveObjectPropertySelector } from '@vitagroup/common';

export interface AddressFormatOptions {
  streetSelector?: ObjectPropertySelector<any>;
  streetNumberSelector?: ObjectPropertySelector<any>;
  citySelector?: ObjectPropertySelector<any>;
  zipSelector?: ObjectPropertySelector<any>;
  additionSelector?: ObjectPropertySelector<any>;
  fallback?: any;
}

/**
 * Formats any object containing address information into a string. The string format can be provided
 * using the following tokens. If no format is present the pipe will default to "full". Additionally
 * any field can be backed up with a fallback value
 *
 *  | Token  | Description                        |
 *  |:------:| ---------------------------------- |
 *  | `sss`  | The street name of the address     |
 *  | `NN`   | The street number of the address   |
 *  | `aaa`  | The address addition (if given)    |
 *  | `ZZ`   | The address zip code               |
 *  | `ccc`  | The city of the address            |
 *
 *  There's also a predefined selection of format aliases to choose from:
 *
 *  | Alias       | Format               |
 *  | ----------- | -------------------- |
 *  | `full`      | `sss nn aaa, zz ccc` |
 *  | `street`    | `sss nn`             |
 *  | `city`      | `zz ccc`             |
 *
 * @param obj     The object value to select the name information from
 * @param format  The desired format to use for the output string value. Defaults to "full"
 * @param options Optional parameters that can be used during the format operation
 */
export function formatAddress(obj: any, format: string = 'full', options?: AddressFormatOptions): string {
  const optimisticStreetSplit = (v) => v?.toString().split(/\s+/);
  const {
    streetSelector = (o) => o.streetName || optimisticStreetSplit(o.street)?.[0],
    streetNumberSelector = (o) => o.streetNumber || optimisticStreetSplit(o.street)?.[1],
    additionSelector = (o) => o.addition || o.additional,
    citySelector = (o) => o.cityName || o.city,
    zipSelector = (o) => o.zipCode || o.zip,
  } = options;

  switch (format) {
    case 'street':
      format = 'sss NN';
      break;
    case 'full':
      format = 'sss NN aaa, ZZ ccc';
      break;
    case 'city':
      format = 'ZZ ccc';
      break;
  }

  return getStringFormat(
    obj,
    format,
    {
      sss: (o) => resolveObjectPropertySelector(o, streetSelector) || '',
      NN: (o) => resolveObjectPropertySelector(o, streetNumberSelector) || '',
      aaa: (o) => resolveObjectPropertySelector(o, additionSelector) || '',
      ccc: (o) => resolveObjectPropertySelector(o, citySelector) || '',
      ZZ: (o) => resolveObjectPropertySelector(o, zipSelector) || '',
    },
    options?.fallback
  ).replace(/\s+,/, ',');
}

export const ADDRESS_FORMAT = new InjectionToken<string>('ADDRESS_FORMAT', {
  providedIn: 'root',
  factory: /* @dynamic */ () => 'sss nn',
});

@Pipe({ name: 'address' })
export class AddressPipe implements PipeTransform {
  transform(obj: any, format: string, options: AddressFormatOptions): string {
    return formatAddress(obj, format, options);
  }
}

@NgModule({
  declarations: [AddressPipe],
  exports: [AddressPipe],
})
export class AddressPipeModule {}
