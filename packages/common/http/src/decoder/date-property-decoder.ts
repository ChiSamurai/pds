import { Provider, Type } from '@angular/core';
import { RESOURCE_PROPERTY_DECODER, ResourcePropertyDecoder } from '../client/resource-property-decoder';
import { JsonValue } from '../client/shared';

export class DatePropertyDecoder implements ResourcePropertyDecoder<Date> {

  canDecode(type: Type<any>): boolean {
    return type === Date;
  }

  decode(value: JsonValue): Date {
    return new Date(value as any);
  }

}

export const DATE_PROPERTY_DECODER_PROVIDER: Provider = {
  provide: RESOURCE_PROPERTY_DECODER,
  useClass: DatePropertyDecoder,
  multi: true
};
