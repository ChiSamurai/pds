import { InjectionToken } from '@angular/core';
import { Routes } from '@angular/router';
import { ArrayBehaviorState } from '../rx';
import { normalizeUrl } from '../utils/normalize-url';

export const SITEMAP = new InjectionToken<Sitemap>('SITEMAP');

export interface SitemapDescriptor {
  routes?: Routes;
  lazyChildren?: Record<string, SitemapDescriptor>;
  routeParamOptions?: Record<string, string[]>;
}

/** @internal */
interface NestedSitemapDescriptor extends SitemapDescriptor {
  baseUrl: string;
}

export interface SiteRef {
  readonly key: string;
  linkUrl: string;
  children?: SiteRef[];
  title?: string;
}

function createSiteRefs(descriptor: SitemapDescriptor): SiteRef[] {
  const siteRefs: SiteRef[] = [];
  if (descriptor.routes != null) {
    for (const route of descriptor.routes) {
      const routeKey = route.data?.[ 'sitemapKey' ] || route.path;
      const routeDescriptor = descriptor.lazyChildren?.[ routeKey ];
      const routeTitle = route.data?.[ 'title' ] || route.data?.[ 'sitemapTitle' ];

      const hasEmptyRoutePath = !route.path;
      // const hasRedirect = !!route.redirectTo;
      const hasWildcardPath = route.path?.includes('*');
      const isAllowed = route.data?.[ 'sitemap' ] !== false;

      if (!hasEmptyRoutePath && !hasWildcardPath && isAllowed) {
        const isParameterized = route.path?.includes(':');
        const routeParamOptions = descriptor.routeParamOptions?.[ routeKey ];
        const routes = (route.children || []).concat(routeDescriptor?.routes || []);
        const resolveBaseUrl = path => {
          const { baseUrl } = descriptor as NestedSitemapDescriptor;
          return baseUrl != null ? normalizeUrl('/', baseUrl, path) : normalizeUrl('/', path);
        };

        if (isParameterized && routeParamOptions != null) {
          for (const paramValue of routeParamOptions) {
            const baseUrl = resolveBaseUrl(paramValue);
            const title = typeof routeTitle === 'object' ? routeTitle[ paramValue ] : null;
            const children = createSiteRefs({
              ...routeDescriptor, baseUrl, routes
            } as NestedSitemapDescriptor);

            siteRefs.push({ children, title, linkUrl: baseUrl, key: paramValue });
          }
        } else {
          const baseUrl = resolveBaseUrl(route.path);
          const title = typeof routeTitle === 'string' ? routeTitle : null;
          const children = createSiteRefs({
            ...routeDescriptor, baseUrl, routes
          } as NestedSitemapDescriptor);

          siteRefs.push({ children, title, linkUrl: baseUrl, key: routeKey });
        }
      }
    }
  }
  return siteRefs;
}

export class Sitemap implements Iterable<SiteRef> {
  protected readonly state = new ArrayBehaviorState<SiteRef>();

  constructor(descriptor: SitemapDescriptor) {
    this.invalidate(descriptor);
  }

  invalidate(descriptor?: SitemapDescriptor): SiteRef[] {
    return this.state.reset(...createSiteRefs(descriptor));
  }

  [ Symbol.iterator ](): Iterator<SiteRef> {
    return this.state.snapshot[ Symbol.iterator ]();
  }
}
