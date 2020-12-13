import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { CLIENT_CONFIG, ClientConfig } from './client-config';
import { ResourceClient } from './resource-client';
import { ResourceEncoder } from './resource-encoder';
import { ResourceOperationOptions, ResourceOperationStrategy } from './shared';
import { UrlRewriter } from './url-rewriter';

export type ResourceCreateOptions = ResourceOperationOptions;
export type ResourceDeleteOptions = ResourceOperationOptions;
export type ResourceUpdateOptions = ResourceOperationOptions;

export const RESOURCE_CREATE_STRATEGY =
  new InjectionToken<ResourceOperationStrategy>('RESOURCE_CREATE_STRATEGY', {
    providedIn: 'root', factory: /* @dynamic */ () => ({ httpMethod: 'put' })
  });

export const RESOURCE_UPDATE_STRATEGY =
  new InjectionToken<ResourceOperationStrategy>('RESOURCE_UPDATE_STRATEGY', {
    providedIn: 'root', factory: /* @dynamic */ () => ({ httpMethod: 'post', defaultRewrite: ':id' })
  });

export const RESOURCE_DELETE_STRATEGY =
  new InjectionToken<ResourceOperationStrategy>('RESOURCE_DELETE_STRATEGY', {
    providedIn: 'root', factory: /* @dynamic */ () => ({ httpMethod: 'delete', defaultRewrite: ':id' })
  });

@Injectable()
export class ResourceWriter extends ResourceClient {

  /**
   * @param createStrategy Gets the {@link ResourceOperationStrategy} used for update operations
   * @param updateStrategy Gets the {@link ResourceOperationStrategy} used for delete operations
   * @param deleteStrategy Gets the {@link ResourceOperationStrategy} used for delete operations
   * @param encoder        Gets the {@link ResourceEncoder} instance for the writer
   */
  constructor(
    @Inject(CLIENT_CONFIG) config: ClientConfig, http: HttpClient, urlRewriter: UrlRewriter,
    @Inject(RESOURCE_CREATE_STRATEGY) readonly createStrategy: ResourceOperationStrategy,
    @Inject(RESOURCE_UPDATE_STRATEGY) readonly updateStrategy: ResourceOperationStrategy,
    @Inject(RESOURCE_DELETE_STRATEGY) readonly deleteStrategy: ResourceOperationStrategy,
    @Optional() readonly encoder: ResourceEncoder | undefined
  ) {
    super(config, http, urlRewriter);
  }

  create<T>(type: Type<T>, resource: Partial<T>, options?: ResourceCreateOptions): Observable<T | any> {
    const { defaultRewrite, httpMethod } = this.createStrategy;
    const url = this.resolveUrl(type, {
      defaultRewrite, rewrite: 'create',
      params: options?.params
    });
    return this.http.request<T>(httpMethod, url, {
      body: this.encoder.encodeResource(resource, type),
      params: options?.queryParams,
    });
  }

  update<T>(type: Type<T>, id: NonNullable<string>, resource: Partial<T>, options?: ResourceUpdateOptions): Observable<T | any> {
    const { defaultRewrite, httpMethod } = this.updateStrategy;
    const url = this.resolveUrl(type, {
      defaultRewrite, rewrite: 'update',
      params: { ...options?.params, id }
    });
    return this.http.request<T>(httpMethod, url, {
      body: this.encoder.encodeResource(resource, type),
      params: options?.queryParams
    });
  }

  delete<T>(type: Type<T>, id: NonNullable<string>, options?: ResourceDeleteOptions): Observable<any> {
    const { defaultRewrite, httpMethod } = this.deleteStrategy;
    const url = this.resolveUrl(type, {
      defaultRewrite, rewrite: 'delete',
      params: options?.params
    });
    return this.http.request<T>(httpMethod, url, {
      params: options?.queryParams
    });
  }

}
