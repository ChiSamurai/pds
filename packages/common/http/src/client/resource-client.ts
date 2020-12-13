import { HttpClient } from '@angular/common/http';
import { Inject, Type } from '@angular/core';
import { normalizeUrl } from '@vitagroup/common';
import { Client } from './client';
import { CLIENT_CONFIG, ClientConfig } from './client-config';
import { RESOURCE_METADATA, ResourceMetadata } from '../decorator/resource';
import { ResourceOperationKey } from './shared';
import { UrlRewriter } from './url-rewriter';

/**
 * Defines options that can be provided during a {@link ResourceClient.resolveUrl}
 * operation. Mainly rewrite behavior configuration
 */
export interface UrlResolveOptions {
  /**
   * Optional operation context key. If a value is provided the resolution
   * operation will automatically try to resolve resource type rewrite rules
   * defined within the {@link ResourceMetadata.rewrite} property. A resource
   * rewrite rule will always overwrite any provided {@link defaultRewrite}
   */
  rewrite?: ResourceOperationKey;
  /**
   * Optional default rewrite rule to use for the resolution. This field can be
   * overwritten by the {@link rewrite} value. Never the less the value will be
   * used if the {@link rewrite} key value doesn't point to a valid rewrite rule
   */
  defaultRewrite?: string;
  /**
   * Optional params to pass over to the {@link UrlRewriter.interpolate}
   * operation. The defined context will automatically be interpolated into
   * the result url
   */
  params?: any;
}

/**
 * @abstract
 */
export abstract class ResourceClient extends Client {

  /**
   * @param urlRewriter Gets the {@link UrlRewriter} for the resource client instance
   */
  constructor(
    @Inject(CLIENT_CONFIG) config: ClientConfig, http: HttpClient,
    protected urlRewriter: UrlRewriter
  ) {
    super(config, http);
  }

  /**
   * Resolves and optionally formats any arbitrary resource related url value
   * using the resource type information and an optional set of options to
   * configure the resulting url value with
   *
   * @param type    The resource type to read the metadata information from
   * @param options Optional configuration values for the resolution operation
   */
  resolveUrl(type: Type<any>, options?: UrlResolveOptions): string {
    const { baseUrl, rewrite }: ResourceMetadata = Reflect.getMetadata(RESOURCE_METADATA, type);
    let url = normalizeUrl(this.config.baseUrl, baseUrl);
    if (options != null) {
      if (rewrite != null && 'rewrite' in options && options.rewrite in rewrite)
        url = this.urlRewriter.rewrite(url, rewrite[ options.rewrite ], options.params);
      else if ('defaultRewrite' in options)
        url = this.urlRewriter.rewrite(url, options.defaultRewrite, options.params);
    }
    return url;
  }

}
