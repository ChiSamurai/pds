import { InjectionToken, Predicate } from '@angular/core';
import { Route, Routes } from '@angular/router';
import { ObjectPropertySelector, resolveObjectPropertySelector } from '../reflection/resolve-object-property-selector';
import { ArrayBehaviorState } from '../rx';
import { normalizeUrl } from '../utils/normalize-url';

export const SITEMAP = new InjectionToken<Sitemap>('SITEMAP');

export interface SitemapDescriptor {
  routes?: Routes;
  lazyChildren?: Record<string, SitemapDescriptor>;
  routeParamOptions?: Record<string, string[]>;
  /**
   * Defines how to and what property of the {@link Route} should be used to
   * retrieve the {@link SiteRef.title} value. Defaults to {@link Route.data.title}
   */
  titleSelector?: ObjectPropertySelector<Route>;
  /**
   * Defines how to and what property of the {@link Route} should be used to
   * retrieve the {@link SiteRef.key} value. Defaults to {@link Route.path}
   */
  keySelector?: ObjectPropertySelector<Route>;
  /**
   * Defines a filter predicate that determines whether or not to include a {@link Route}
   * into the {@link SiteRef} generation process
   */
  filter?: Predicate<Route>;
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
  const resolveBaseUrl = (path) => {
    const { baseUrl } = descriptor as NestedSitemapDescriptor;
    return baseUrl != null ? normalizeUrl('/', baseUrl, path) : normalizeUrl('/', path);
  };

  if (descriptor.routes != null) {
    const { titleSelector, keySelector, filter } = descriptor;

    for (const route of descriptor.routes) {
      const routeKey = resolveObjectPropertySelector(route, keySelector, route.path);
      const routeDescriptor = descriptor.lazyChildren?.[routeKey];
      const routeTitle = resolveObjectPropertySelector(route, titleSelector, route.data?.title);

      const isEmptyRoute = !route.path && !route.children?.length;
      const isWildcardRoute = route.path?.includes('*');
      const isFiltered = filter?.(route);
      const isParameterized = route.path?.includes(':');

      if (!isEmptyRoute && !isWildcardRoute && !isFiltered) {
        const routeParamOptions = descriptor.routeParamOptions?.[routeKey];
        const routes = (route.children || []).concat(routeDescriptor?.routes || []);

        if (isParameterized && routeParamOptions != null) {
          for (const paramValue of routeParamOptions) {
            const baseUrl = resolveBaseUrl(paramValue);
            const title = typeof routeTitle === 'object' ? routeTitle[paramValue] : null;
            const children = createSiteRefs({
              ...routeDescriptor,
              baseUrl,
              routes,
            } as NestedSitemapDescriptor);

            siteRefs.push({ children, title, linkUrl: baseUrl, key: paramValue });
          }
        } else {
          const baseUrl = resolveBaseUrl(route.path);
          const title = typeof routeTitle === 'string' ? routeTitle : null;
          const children = createSiteRefs({
            ...routeDescriptor,
            baseUrl,
            routes,
          } as NestedSitemapDescriptor);

          if (routeKey) siteRefs.push({ children, title, linkUrl: baseUrl, key: routeKey });
          else siteRefs.push(...children);
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

  [Symbol.iterator](): Iterator<SiteRef> {
    return this.state.snapshot[Symbol.iterator]();
  }
}
