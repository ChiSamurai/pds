import { InjectionToken, Type } from '@angular/core';
import { JsonValue } from './shared';

export interface ResourcePropertyDecoder<T = any> {

  canDecode(type: Type<any>): boolean;

  decode(value: JsonValue): T;

}

export const RESOURCE_PROPERTY_DECODER = new InjectionToken<ResourcePropertyDecoder>('RESOURCE_PROPERTY_DECODER');
