import { Provider, Type } from '@angular/core';
import { RESOURCE_PROPERTY_ENCODER, ResourcePropertyEncoder } from '../client/resource-property-encoder';
import { JsonValue } from '../client/shared';

export class DatePropertyEncoder implements ResourcePropertyEncoder<Date> {

  canEncode(type: Type<any>): boolean {
    return type === Date;
  }

  encode(value: Date): JsonValue {
    return value?.toJSON();
  }

}

export const DATE_PROPERTY_ENCODER_PROVIDER: Provider = {
  provide: RESOURCE_PROPERTY_ENCODER,
  useClass: DatePropertyEncoder,
  multi: true
};
