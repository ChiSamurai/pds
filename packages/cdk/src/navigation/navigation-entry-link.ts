import {
  Attribute,
  Directive,
  ElementRef,
  inject,
  Inject,
  InjectionToken,
  Injector,
  Input,
  Optional,
  Renderer2,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { WINDOW } from '@ng-web-apis/common';
import { RouterLinkOrHref, StringInterpolator, URL_PARAM_INTERPOLATION_SCHEME } from '@vitagroup/common';
import { NavigationEntry } from './navigation-entry';

export const NAVIGATION_LINK_URL_PARAMS = new InjectionToken<Params>('NAVIGATION_LINK_URL_PARAMS');

@Directive({
  selector: '[navEntryLink]',
  providers: [{ provide: RouterLink, useExisting: NavigationEntryLink }],
})
export class NavigationEntryLink extends RouterLinkOrHref {
  private _entry: NavigationEntry;

  @Input('navEntryLink')
  set entry(value: NavigationEntry) {
    if (typeof value?.linkUrl === 'string') {
      this.routerLinkOrHref = this.interpolateLinkUrl(value?.linkUrl);
    } else {
      this.routerLinkOrHref = value?.linkUrl;

      if (value?.linkUrl != null)
        this.routerLinkOrHref = this.interpolateLinkUrl(inject(Router).serializeUrl(this.urlTree));
    }

    this._entry = value;
  }
  get entry(): NavigationEntry {
    return this._entry;
  }

  constructor(
    router: Router,
    route: ActivatedRoute,
    protected renderer: Renderer2,
    protected element: ElementRef,
    protected sanitizer: DomSanitizer,
    protected injector: Injector,
    protected stringInterpolator: StringInterpolator,
    @Inject(WINDOW) protected window: /* @dynamic */ Window,
    @Attribute('tab-index') tabIndex: string,
    @Optional()
    @Inject(NAVIGATION_LINK_URL_PARAMS)
    readonly linkUrlParams?: any
  ) {
    super(router, route, renderer, element, sanitizer, window, tabIndex);
  }

  interpolateLinkUrl(value: string): string {
    return this.stringInterpolator.interpolate(value, this.linkUrlParams, URL_PARAM_INTERPOLATION_SCHEME);
  }

  onClick(): boolean {
    if (typeof this._entry.action === 'function') {
      const deps = this._entry.deps?.map((dep) => this.injector.get(dep));
      this._entry.action(...deps);
    }
    return super.onClick();
  }
}
