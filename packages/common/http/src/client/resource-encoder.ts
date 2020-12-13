import { Inject, Injectable, Injector, Optional, Type } from '@angular/core';
import { isResourceType } from '../decorator/resource';
import { RESOURCE_PROPERTY_METADATA, ResourcePropertyMetadata } from '../decorator/resource-property';
import { RESOURCE_PROPERTY_ENCODER, ResourcePropertyEncoder } from './resource-property-encoder';
import { JsonObject, JsonValue } from './shared';

export interface ResourcePropertyEncodeOptions {
  encoder?: Type<any>;
}

@Injectable({ providedIn: 'root' })
export class ResourceEncoder {
  constructor(
    @Optional() @Inject(RESOURCE_PROPERTY_ENCODER) readonly encoders: ResourcePropertyEncoder[] | null,
    protected injector: Injector
  ) {
  }

  resolvePropertyEncoder(type: Type<any>): ResourcePropertyEncoder {
    return this.encoders?.find(encoder => encoder.canEncode(type));
  }

  encodeProperty(value: any, type?: Type<any>, options?: ResourcePropertyEncodeOptions): JsonValue {
    if (isResourceType(type)) return this.encodeResource(value, type);

    const resolvedEncoder = this.resolvePropertyEncoder(type);
    const propertyEncoder: ResourcePropertyEncoder =
      options?.encoder != null
        ? this.encoders?.find(encoder => encoder instanceof options.encoder) || this.injector.get(options.encoder)
        : resolvedEncoder;

    return propertyEncoder?.encode(value) || JSON.stringify(value);
  }

  encodeResource(value: any, type: Type<any>): JsonObject {
    if (!value) throw new Error('Cannot encode "null"');

    const json: JsonObject = {};
    const resourceProperties: Map<PropertyKey, ResourcePropertyMetadata> =
      Reflect.getMetadata(RESOURCE_PROPERTY_METADATA, type);
    for (const [ propertyKey, metadata ] of resourceProperties.entries()) {
      const propertyValue = value[ propertyKey ];
      json[ propertyKey.toString() ] = propertyValue && this.encodeProperty(
        propertyKey,
        metadata?.type,
        metadata
      );
    }
    return json;
  }
}
