import { Inject, Injectable, InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { WINDOW } from '@ng-web-apis/common';
import { filter } from 'rxjs/operators';
import { getStringFormat, traverse } from '../utils';

export type BrowserTitleFallbackResolver = (route: ActivatedRouteSnapshot, title: any) => any;

export const BROWSER_TITLE_FORMAT = new InjectionToken<string>('BROWSER_TITLE_FORMAT', {
  providedIn: 'root',
  factory: /* @dynamic */ () => 'TTT',
});
export const BROWSER_TITLE_FALLBACK_RESOLVER = new InjectionToken<BrowserTitleFallbackResolver>(
  'BROWSER_TITLE_FALLBACK_RESOLVER',
  {
    providedIn: 'root',
    factory: /* @dynamic */ () => (snapshot, title) => snapshot.url[0]?.path,
  }
);

@Injectable()
export class BrowserTitle {
  private _cachedBrowserTitle: string = this.title.getTitle();

  constructor(
    protected title: Title,
    router: Router,
    activatedRoute: ActivatedRoute,
    @Inject(BROWSER_TITLE_FALLBACK_RESOLVER)
    protected resolveFallback: /* @dynamic */ BrowserTitleFallbackResolver,
    @Inject(BROWSER_TITLE_FORMAT)
    public format: string
  ) {
    if (format != null) this.format = format;

    router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      const lastChild = traverse(
        activatedRoute.snapshot,
        (s) => s.firstChild,
        (s) => s.firstChild == null
      );
      this.onNavigationEnd(lastChild);
    });
  }

  protected onNavigationEnd(snapshot: ActivatedRouteSnapshot): void {
    const { data } = snapshot;
    let title = data?.browserTitle || data?.windowTitle || data?.title;

    if (typeof title !== 'string' && typeof title !== 'function') title = this.resolveFallback(snapshot, title);

    if (typeof title === 'function') title = title(data);

    if (title != null) this.title.setTitle(getStringFormat(title, this.format, { TTT: (value) => value }));
    else this.reset();
  }

  reset(): void {
    this.title.setTitle(this._cachedBrowserTitle);
  }
}

@NgModule()
export class BrowserTitleModule {
  static forRoot(): ModuleWithProviders<BrowserTitleModule> {
    return {
      ngModule: BrowserTitleModule,
      providers: [BrowserTitle],
    };
  }

  // todo(@janunld): refactor this to be called in an APP_BOOTSTRAP_LISTENER!
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  constructor(browserTitle: BrowserTitle) {}
}
