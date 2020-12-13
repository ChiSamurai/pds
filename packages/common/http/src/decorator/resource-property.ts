import 'reflect-metadata';
import { Type } from '@angular/core';

/**
 * Holds the {@link Symbol} definition for resource property metadata
 * information which gets attached to static context of any parent type (aka.
 * class) it is used within
 */
export const RESOURCE_PROPERTY_METADATA = Symbol('adk:resource_property_metadata');

/**
 * Describes the metadata information of a property in the static context of a
 * {@link Resource} decorated type. Metadata information about the properties of
 * a resource is stored statically on the parent type itself using the
 * {@link RESOURCE_PROPERTY_METADATA} symbol as identifier
 */
// todo(@JanUnld): consider property selector rather than property "key"
//  discovery functionality?!
export interface ResourcePropertyMetadata {
  /**
   * Defines whether the given property value is iterable or not. Whenever a
   * property is defined as iterable, {@link ResourceDecoder} services will
   * automatically decode incoming array structures, such as json arrays, into
   * an array containing the respective objects of the given {@link type}
   */
  iterable?: boolean;
  /**
   * Defines the constructor (aka. type) of the resource property value. This
   * function constructor will be used to create the according object for the
   * property value. If no value is provided, {@link ResourceDecoder}s will
   * leave any incoming response value untouched for this property
   */
  type?: Type<any>;
  /**
   * Defines an explicit {@link ResourcePropertyDecoder} that should be used for
   * the given property context. If no type is provided, {@link ResourceDecoder}
   * will try to resolve and match any available {@link RESOURCE_PROPERTY_DECODER}
   */
  decoder?: Type<any>;
  /**
   * Defines an explicit {@link ResourcePropertyEncoder} that should be used for
   * the given property context. If no type is provided, {@link ResourceEncoder}
   * will try to resolve and match any available {@link RESOURCE_PROPERTY_ENCODER}
   */
  encoder?: Type<any>;
  /**
   * Defines the property key that will be used to obtain the desired response
   * body property value. If no key value is defined, the actual class property
   * name, which this information gets attached to, will be used instead
   */
  key?: string;
}

/**
 * Stores {@link ResourcePropertyMetadata} statically on any parent type (aka.
 * class) it is used within, making the properties reflectable and from a
 * {@link ResourceClient} perspective
 *
 * @param [metadata] Optionally information that can be attached in addition
 * @decorator
 */
export function Property(metadata?: ResourcePropertyMetadata): PropertyDecorator {
  return function ResourcePropertyDecorator(target, propertyKey) {
    const type = target.constructor;
    // if the type already owns a definition for the resource property metadata
    // this definition will be stored into a local variable. otherwise a new
    // map of property keys to metadata information will be created
    const properties: Map<PropertyKey, ResourcePropertyMetadata> =
      Reflect.getMetadata(RESOURCE_PROPERTY_METADATA, type) || new Map();
    // lets check the metadata for any type mapping definition. if there's none
    // then we try to automatically attach any "design:type" information. this
    // behavior is rather experimental and should not be directly depended on
    // as the typescript reflection does yield pretty inconsistent results.
    // especially in the context of property reflection
    // todo(@JanUnld): consider removing the typescript reflection here?!
    if (metadata && !metadata.hasOwnProperty('type'))
      metadata.type = Reflect.getMetadata('design:type', target, propertyKey);
    // we then use this map of property keys and their respective metadata
    // information to add the given property metadata to the collection
    properties.set(propertyKey, metadata);
    // finally (re-)attach the statically stored property metadata information
    Reflect.defineMetadata(RESOURCE_PROPERTY_METADATA, properties, type);
  };
}
