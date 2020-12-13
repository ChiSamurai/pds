import { Attribute, Directive, ElementRef, Inject, Input, NgModule, Renderer2, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WINDOW } from '@ng-web-apis/common';
import { isAbsoluteURL } from '../utils/is-absolute-url';

@Directive({
  selector: '[routerLinkOrHref]',
  providers: [
    { provide: RouterLink, useExisting: RouterLinkOrHref }
  ]
})
export class RouterLinkOrHref extends RouterLink {
  private _isRouterLink = false;
  private _href: string;

  // tslint:disable-next-line:no-inferrable-types
  @Input() target: string = '_blank';

  @Input() set routerLinkOrHref(value: any[] | string) {
    if (typeof value === 'string' && isAbsoluteURL(value)) {
      this._href = this.sanitizer.sanitize(SecurityContext.URL, value);
      this.resetRouterLink();
    } else {
      this._isRouterLink = true;
      if (value != null) this.routerLink = value;
      else this.resetRouterLink();
      this._href = null;
    }
  }

  get isRouterLink(): boolean {
    return this._isRouterLink;
  }
  get isHref(): boolean {
    return this._href != null;
  }

  constructor(
    // due to the unfortunate fact, that the `RouterLink` does declare the properties "router" and
    // "route" privately, we need to given them another name here...
    protected router2: Router,
    protected route2: ActivatedRoute,
    protected renderer: Renderer2,
    protected element: ElementRef,
    protected sanitizer: DomSanitizer,
    @Inject(WINDOW) protected window: /* @dynamic */ Window,
    @Attribute('tab-index') tabIndex: string
  ) {
    super(router2, route2, tabIndex, renderer, element);
  }

  protected resetRouterLink(): void {
    this._isRouterLink = false;
    // workaround, forcing routerLinkActive directives to not react on this instance anymore,
    // since "ꝋ" is not a valid url character, we should actually never be able to active such
    // an instance
    this.routerLink = 'ꝋ';
  }

  onClick(): boolean {
    if (this._href != null) {
      this.window.open(this._href, this.target);
      return true;
    } else if (this._isRouterLink) {
      return super.onClick();
    } else {
      return false;
    }
  }
}

@NgModule({
  declarations: [ RouterLinkOrHref ],
  exports: [ RouterLinkOrHref ]
})
export class RouterLinkOrHrefModule {
}
