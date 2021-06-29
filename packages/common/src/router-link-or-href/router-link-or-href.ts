import {
  Attribute,
  Directive,
  ElementRef,
  Inject,
  Input,
  NgModule,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SecurityContext,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WINDOW } from '@ng-web-apis/common';
import { ShortcutManager } from '../shortcut-manager/shortcut-manager';
import { isAbsoluteURL } from '../utils/is-absolute-url';

@Directive({
  selector: '[routerLinkOrHref]',
  providers: [{ provide: RouterLink, useExisting: RouterLinkOrHref }],
})
export class RouterLinkOrHref extends RouterLink implements OnInit, OnDestroy {
  private _isRouterLink = false;
  private _href: string;

  readonly shortcuts = new ShortcutManager(this.renderer, this.element);

  @Input() target = '_blank';

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
    protected renderer: Renderer2,
    protected element: ElementRef,
    protected sanitizer: DomSanitizer,
    @Inject(WINDOW) protected window: /* @dynamic */ Window,
    @Attribute('tab-index') tabIndex: string,
    @Optional() router?: Router,
    @Optional() route?: ActivatedRoute
  ) {
    super(router, route, tabIndex, renderer, element);
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

  ngOnInit() {
    this.shortcuts.register('enter', () => this.onClick());
  }
  ngOnDestroy() {
    this.shortcuts.clear();
  }
}

@NgModule({
  declarations: [RouterLinkOrHref],
  exports: [RouterLinkOrHref],
})
export class RouterLinkOrHrefModule {}
