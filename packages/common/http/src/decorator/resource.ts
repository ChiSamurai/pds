import 'reflect-metadata';
import { Type } from '@angular/core';
import { ResourceOperationKey } from '../client/shared';

/**
 * Holds the {@link Symbol} definition for resource metadata information which
 * gets attached statically to the resource type itself
 */
export const RESOURCE_METADATA = Symbol('__resource_metadata__');

/**
 * Describes additional metadata information that will be attached to the
 * static context of the {@link Resource} type. Metadata information about
 * the resource is stored statically on the resource type itself using the
 * {@link RESOURCE_METADATA} symbol as identifier
 */
export interface ResourceMetadata {
  /**
   * Defines the base url "segments" in the context of the given resource type.
   * The value itself is going to be concatenated and normalized in combination
   * with the {@link ClientConfig.baseUrl} value
   */
  // todo(@janunld): consider absolute and relative url values?! eg. starting
  //  with a "/" value might block the concatenation with any outer configured
  //  client config base url value
  baseUrl: string;
  /**
   * Defines optional rewrite rules for resource client operations such as
   * {@link ResourceReader.find} or {@link ResourceWriter.update}. Using the key
   * of the operation as rule key will automatically result the rule getting
   * append in that operation context. Rewrite rules can be defined in two (2)
   * difference manners. The first on is just a simple "relative" append
   * mechanism that will concat and normalize any given value to the existing
   * base url value. The second mechanism will fully overwrite any given base
   * url value in an "absolute" fashion
   */
  // todo(@janunld): add examples
  rewrite?: Record<ResourceOperationKey | string, string>;
}

/**
 * Stores {@link ResourceMetadata} statically on the resource type itself,
 * making the information reflectable from a {@link ResourceClient} perspective
 *
 * @param metadata Required resource base metadata information
 * @decorator
 */
export function Resource(metadata: ResourceMetadata): ClassDecorator {
  return function ResourceDecorator(type) {
    Reflect.defineMetadata(RESOURCE_METADATA, metadata, type);
  };
}

/**
 * Checks whether a given type is a resource type, thus contains statically
 * attached resource metadata information
 */
export function isResourceType(type: Type<any>): boolean {
  return type && Reflect.hasMetadata(RESOURCE_METADATA, type);
}
