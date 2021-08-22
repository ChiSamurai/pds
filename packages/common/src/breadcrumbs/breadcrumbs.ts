import { Injectable } from '@angular/core';
import { IsActiveMatchOptions, NavigationEnd, Route, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ArrayBehaviorState } from '../rx';
import { Sitemap, SiteRef } from '../sitemap/sitemap';
import { traverse } from '../utils';

@Injectable({ providedIn: 'root' })
export class Breadcrumbs extends ArrayBehaviorState<SiteRef> {
  constructor(readonly sitemap: Sitemap, protected router: Router) {
    super();

    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(this.onNavigationEnd.bind(this));
    this.reset(...this.resolveActiveSitePath());
  }

  protected onNavigationEnd(e: NavigationEnd): void {
    this.reset(...this.resolveActiveSitePath());
  }

  isActiveSite(site: SiteRef, options?: Partial<IsActiveMatchOptions>): boolean {
    return this.router.isActive(site.linkUrl, {
      paths: 'exact',
      matrixParams: 'ignored',
      fragment: 'ignored',
      queryParams: 'ignored',
      ...options,
    });
  }
  findActiveSite(sites: SiteRef[], options?: Partial<IsActiveMatchOptions>): SiteRef | null {
    return sites?.find((site) => {
      const paths = site.linkUrl === '/' ? 'exact' : 'subset';
      return this.isActiveSite(site, { ...options, paths });
    });
  }

  resolveActiveSitePath(): SiteRef[] {
    const activeRootSite = this.findActiveSite(this.sitemap, { paths: 'subset' });
    const activeSitePath: SiteRef[] = (activeRootSite && [activeRootSite]) || [];

    traverse(activeRootSite, (site) => {
      const activeChildSite = this.findActiveSite(site.children);
      if (activeChildSite != null) activeSitePath.push(activeChildSite);
      return activeChildSite;
    });

    let fullRouteData = this.router.routerState.root.snapshot.data;

    const activeBreadcrumb = activeSitePath[activeSitePath?.length - 1];
    const activeRouteSnapshot = traverse(this.router.routerState.root.snapshot, (snapshot) => {
      fullRouteData = { ...fullRouteData, ...snapshot.data };
      return snapshot.firstChild;
    });
    const activeRoute: Route = {
      ...activeRouteSnapshot?.routeConfig,
      data: fullRouteData,
    };

    if (activeRoute?.path.startsWith(':') && activeRoute?.path !== activeBreadcrumb?.route.path) {
      activeSitePath.push({
        route: activeRoute,
        linkUrl: '.',
      } as SiteRef);
    }

    return activeSitePath;
  }
}
