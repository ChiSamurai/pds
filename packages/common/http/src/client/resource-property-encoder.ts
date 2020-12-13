import { InjectionToken, Type } from '@angular/core';
import { JsonValue } from './shared';

export interface ResourcePropertyEncoder<T = any> {

  canEncode(type: Type<any>): boolean;

  encode(value: T): JsonValue;

}

export const RESOURCE_PROPERTY_ENCODER = new InjectionToken<ResourcePropertyEncoder>('RESOURCE_PROPERTY_ENCODER');
