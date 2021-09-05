import { HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { QueryParams } from '@vitagroup/common';

/** Defines the strategy configuration for any resource operation */
export interface ResourceOperationStrategy {
  /**
   * Defines an optional default default rewrite rule for the given operation.
   * This rule will be overwritten by any custom defined rewrite rule within
   * the {@link ResourceMetadata.rewrite} configuration
   */
  defaultRewrite?: string;
  /** Defines the http method for the given resource operation  */
  httpMethod: string;
}

/**
 * Holds the common option fields available for any resource related request
 * call
 */
export interface ResourceOperationOptions {
  queryParams?: HttpParams | QueryParams;
  params?: Params;
}

export type ResourceOperationKey = 'find' | 'list' | 'create' | 'update' | 'delete';

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonObject | JsonArray | JsonPrimitive | undefined;

export type JsonArray = Array<JsonValue>;

export interface JsonObject {
  [propertyKey: string]: JsonValue;
}
