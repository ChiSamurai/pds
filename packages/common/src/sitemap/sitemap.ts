import { Injectable, Optional } from '@angular/core';
import { Route, Routes } from '@angular/router';
import { normalizeUrl } from '../utils/normalize-url';

/** Describes a {@link Route.path} string */
export type RoutePath = string;
/** Describes a parameterized {@link Route.path} string */
export type ParameterizedRoutePath = `:${RoutePath}`;

export interface SitemapDescriptor {
  /** Defines the {@link Routes} that are available directly after {@link ApplicationRef.bootstrap} */
  routes: Routes;
  /**
   * Loads any potentially lazily defined route to make sure that the **full** sitemap
   * tree can be generated at any time
   */
  loadChildren?: Record<RoutePath, SitemapDescriptor | Routes>;
  /** Loads any potential param values for the desired parameterized routes */
  loadParamValues?: Record<ParameterizedRoutePath, string[]>;
}

/** @internal */
interface NestedSitemapDescriptor extends SitemapDescriptor {
  baseUrl: string;
}

export interface SiteRef {
  readonly route: Route;

  linkUrl: string;
  children?: SiteRef[];
}

@Injectable()
export class Sitemap extends Array<SiteRef> {
  constructor(@Optional() descriptor?: /** @dynamic */ SitemapDescriptor) {
    super(...((descriptor && createSitemap(descriptor)) || []));
  }
}

export function createSitemap(descriptor: SitemapDescriptor | Routes): Sitemap {
  const sitemap = [];

  const resolveBaseUrl = (path: string) => {
    const { baseUrl } = descriptor as NestedSitemapDescriptor;
    return baseUrl != null ? normalizeUrl('/', baseUrl, path) : normalizeUrl('/', path);
  };

  // we need to ensure that the code that follows this statement is dealing with a `SitemapDescriptor` value!
  if (Array.isArray(descriptor)) descriptor = { routes: descriptor as Routes };

  if (descriptor.routes != null) {
    for (const route of descriptor.routes) {
      const routePath = route.path;

      const isWildcardRoute = routePath?.includes('*');
      const isParameterized = routePath?.includes(':');

      if (!isWildcardRoute) {
        const childDescriptor = descriptor.loadChildren?.[routePath];
        // todo(@janunld): find a solution for routes with multiple parameters!!!
        const routeParamKey = routePath.split('/').find((segment) => segment.startsWith(':'));
        const routeParamOptions = descriptor.loadParamValues?.[routeParamKey];
        const routes = (route.children || []).concat(
          Array.isArray(childDescriptor) ? childDescriptor : childDescriptor?.routes || []
        );

        const resolveChildren = (baseUrl: string) => {
          const children = createSitemap({
            ...childDescriptor,
            baseUrl,
            routes,
          } as NestedSitemapDescriptor);

          return (children?.length && children) || null;
        };

        if (isParameterized && routeParamOptions != null) {
          for (const paramValue of routeParamOptions) {
            const baseUrl = resolveBaseUrl(routePath.replace(routeParamKey, paramValue));
            const children = resolveChildren(baseUrl);

            sitemap.push({ children, linkUrl: baseUrl, route });
          }
        } else {
          const baseUrl = resolveBaseUrl(routePath);
          const children = resolveChildren(baseUrl);

          if (routePath || route.loadChildren) sitemap.push({ children, linkUrl: baseUrl, route });
          else if (children) sitemap.push(...children);
        }
      }
    }
  }

  return 'baseUrl' in descriptor ? sitemap : new Sitemap().concat(...sitemap);
}
