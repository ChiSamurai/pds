import { Inject, Injectable, Injector, Optional, Type } from '@angular/core';
import { isResourceType } from '../decorator/resource';
import { RESOURCE_PROPERTY_METADATA, ResourcePropertyMetadata } from '../decorator/resource-property';
import { ResourceFactory } from './resource-factory';
import { RESOURCE_PROPERTY_DECODER, ResourcePropertyDecoder } from './resource-property-decoder';
import { JsonArray, JsonObject, JsonValue } from './shared';

export interface ResourcePropertyDecodeOptions {
  decoder?: Type<any>;
  iterable?: boolean;
}

@Injectable()
export class ResourceDecoder {
  constructor(
    @Optional() @Inject(RESOURCE_PROPERTY_DECODER) readonly decoders: ResourcePropertyDecoder[] | null,
    protected resourceFactory: ResourceFactory,
    protected injector: Injector
  ) {
  }

  resolvePropertyDecoder(type: Type<any>): ResourcePropertyDecoder | null {
    return this.decoders?.find(encoder => encoder.canDecode(type));
  }

  decodeProperty<T>(value: JsonValue, type?: Type<T>, options?: ResourcePropertyDecodeOptions): T {
    if (isResourceType(type)) return this.decodeResource(value as JsonObject, type);

    const resolvedDecoder = this.resolvePropertyDecoder(type);
    const propertyDecoder: ResourcePropertyDecoder =
      options?.decoder != null
        ? (this.decoders.find(decoder => decoder instanceof options.decoder) || this.injector.get(options.decoder, resolvedDecoder))
        : resolvedDecoder;

    if (options?.iterable && !Array.isArray(value))
      throw new Error(`Unable to decode resource property. Expected iterable value but received non iterable value`);

    const decodeValueOrLeaveUntouched = v => propertyDecoder?.decode(v) || v;
    return options?.iterable
      ? (value as JsonArray).map(it => decodeValueOrLeaveUntouched(it))
      : decodeValueOrLeaveUntouched(value);
  }

  decodeResource<T>(value: JsonObject, type: Type<T>): T {
    if (!value) return null;
    const instance: any = this.resourceFactory.create(type);
    const resourceProperties: Map<PropertyKey, ResourcePropertyMetadata> =
      Reflect.getMetadata(RESOURCE_PROPERTY_METADATA, type);
    for (const [ propertyKey, metadata ] of resourceProperties.entries()) {
      instance[ propertyKey ] = this.decodeProperty<any>(
        value[ metadata.key || propertyKey?.toString() ],
        metadata.type,
        metadata
      );
    }
    return instance;
  }
}
