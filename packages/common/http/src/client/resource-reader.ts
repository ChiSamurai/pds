import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CLIENT_CONFIG, ClientConfig } from './client-config';
import { ResourceClient } from './resource-client';
import { ResourceDecoder } from './resource-decoder';
import { ResourceFactory } from './resource-factory';
import { JsonArray, JsonObject, ResourceOperationOptions, ResourceOperationStrategy } from './shared';
import { UrlRewriter } from './url-rewriter';

export type ResourceFindOptions = ResourceOperationOptions;
export type ResourceListOptions = ResourceOperationOptions;

export const RESOURCE_FIND_STRATEGY =
  new InjectionToken<ResourceOperationStrategy>('RESOURCE_FIND_STRATEGY', {
    providedIn: 'root', factory: /* @dynamic */ () => ({ httpMethod: 'get', defaultRewrite: ':id' })
  });

export const RESOURCE_LIST_STRATEGY =
  new InjectionToken<ResourceOperationStrategy>('RESOURCE_LIST_STRATEGY', {
    providedIn: 'root', factory: /* @dynamic */ () => ({ httpMethod: 'get' })
  });

@Injectable()
export class ResourceReader extends ResourceClient {

  /**
   * @param findStrategy Gets the {@link ResourceOperationStrategy} used for find operations
   * @param listStrategy Gets the {@link ResourceOperationStrategy} used for list operations
   * @param decoder      Gets the {@link ResourceDecoder} instance for the reader
   * @param factory      Gets the {@link ResourceFactory} instance for the reader
   */
  constructor(
    @Inject(CLIENT_CONFIG) config: ClientConfig, http: HttpClient, urlRewriter: UrlRewriter,
    @Inject(RESOURCE_FIND_STRATEGY) readonly findStrategy: ResourceOperationStrategy,
    @Inject(RESOURCE_LIST_STRATEGY) readonly listStrategy: ResourceOperationStrategy,
    @Optional() readonly decoder: ResourceDecoder | undefined,
    readonly factory: ResourceFactory
  ) {
    super(config, http, urlRewriter);
  }

  find<T>(type: Type<T>, id: NonNullable<string>, options?: ResourceFindOptions): Observable<T> {
    const { httpMethod, defaultRewrite } = this.findStrategy;
    const url = this.resolveUrl(type, {
      defaultRewrite, rewrite: 'find',
      params: { ...options?.params, id }
    });
    return this.http.request<JsonObject>(httpMethod, url, {
      params: options?.queryParams
    }).pipe(map(
      (json: JsonObject) => this.decoder != null
        ? this.decoder.decodeResource<T>(json, type)
        : this.factory.create(type, json as any)
    ));
  }

  list<T>(type: Type<T>, options?: ResourceListOptions): Observable<T[]> {
    const { httpMethod, defaultRewrite } = this.listStrategy;
    const url = this.resolveUrl(type, {
      defaultRewrite, rewrite: 'list',
      params: options?.params
    });
    return this.http.request<JsonArray>(httpMethod, url, {
      params: options?.queryParams
    }).pipe(map(jsonArray => jsonArray?.map(
      (json: JsonObject) => this.decoder != null
        ? this.decoder.decodeResource<T>(json, type)
        : this.factory.create<T>(type, json as any)
    )));
  }

  // todo(@janunld): consider paging support?!!

}
