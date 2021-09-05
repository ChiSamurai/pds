import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { ActivatedRouteSnapshot, IsActiveMatchOptions, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ArrayBehaviorState } from '../rx';
import { Sitemap, SiteRef } from '../sitemap/sitemap';
import { traverse } from '../utils';

export interface ActiveSiteRef extends SiteRef {
  activatedRoute: ActivatedRouteSnapshot;
}

export interface BreadcrumbSiteRef extends ActiveSiteRef {
  title?: string;
}

export type BreadcrumbTitleSelector = (site: ActiveSiteRef) => string;

export const BREADCRUMB_TITLE_SELECTOR = new InjectionToken<BreadcrumbTitleSelector>('BREADCRUMB_TITLE_SELECTOR', {
  providedIn: 'root',
  factory: /* @dynamic */ () => (site) => site.activatedRoute.data?.title,
});

@Injectable({ providedIn: 'root' })
export class Breadcrumbs extends ArrayBehaviorState<BreadcrumbSiteRef> {
  constructor(
    readonly sitemap: Sitemap,
    protected router: Router,
    @Optional()
    @Inject(BREADCRUMB_TITLE_SELECTOR)
    protected titleSelector?: /* @dynamic */ BreadcrumbTitleSelector
  ) {
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

  resolveActiveSitePath(): BreadcrumbSiteRef[] {
    const activeRootSite = this.findActiveSite(this.sitemap, { paths: 'subset' });
    const activeSitePath: SiteRef[] = (activeRootSite && [activeRootSite]) || [];

    traverse(activeRootSite, (site) => {
      const activeChildSite = this.findActiveSite(site.children);
      if (activeChildSite != null) activeSitePath.push(activeChildSite);
      return activeChildSite;
    });

    // todo: check whether the leaf site is parameterized and not included in the sitemap
    //  and try to resolve and add it to the active site path, if possible!

    return activeSitePath
      .map<BreadcrumbSiteRef>(this.mapActiveSiteRef.bind(this))
      .filter((breadcrumb) => breadcrumb.activatedRoute.data?.breadcrumb !== false);
  }

  protected mapActiveSiteRef(site: SiteRef): BreadcrumbSiteRef {
    const activatedRoute = traverse(
      this.router.routerState.root.snapshot,
      (snapshot) => snapshot.firstChild,
      (snapshot) => snapshot.routeConfig.path === site.route.path
    );
    const breadcrumbRef = { ...site, activatedRoute };
    const title = this.titleSelector?.(breadcrumbRef);

    return title ? { ...breadcrumbRef, title } : breadcrumbRef;
  }
}
