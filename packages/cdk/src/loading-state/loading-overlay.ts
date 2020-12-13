import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, InjectionToken, Optional, Type } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ElementLoadingState } from './element-loading-state';
import { LOADING_INDICATOR_COMPONENT } from './loading-indicator';

// todo(@janunld) add support for 'onHttpEvent'
export type LoadingOverlayStrategy = 'onRouterEvent';
export const LOADING_OVERLAY_STRATEGY =
  new InjectionToken<LoadingOverlayStrategy>('LOADING_OVERLAY_STRATEGY');

@Injectable({ providedIn: 'root' })
export class LoadingOverlay {
  protected readonly componentPortal: ComponentPortal<any>;
  protected bodyElementState: ElementLoadingState;

  readonly overlayRef: OverlayRef;

  constructor(
    protected overlay: Overlay,
    @Inject(DOCUMENT)
    protected readonly document: /* @dynamic */ Document,
    @Inject(LOADING_INDICATOR_COMPONENT)
    protected readonly indicatorComponentType: /* @dynamic */ Type<any>,
    @Inject(LOADING_OVERLAY_STRATEGY)
    readonly strategy: /* @dynamic */ LoadingOverlayStrategy,
    @Optional() protected router: Router
  ) {
    if (router == null && strategy === 'onRouterEvent')
      throw new Error(
        `Unable to use loading overlay strategy "onRouterEvent" without a provided Router. Please` +
        `make sure to properly import the RouterModule!`
      );
    else this._setupOnRouterEventStrategy();

    this.bodyElementState = new ElementLoadingState(document.body);
    this.componentPortal = new ComponentPortal(indicatorComponentType);
    this.overlayRef = overlay.create(
      new OverlayConfig({
        panelClass: 'loading-overlay',
        scrollStrategy: overlay.scrollStrategies.block(),
        positionStrategy: overlay
          .position()
          .global()
          .centerVertically()
          .centerHorizontally()
      })
    );
  }

  attach(): void {
    this.bodyElementState.set();
    if (!this.overlayRef.hasAttached())
      this.overlayRef.attach(this.componentPortal);
  }
  detach(): void {
    this.bodyElementState.unset();
    if (this.overlayRef.hasAttached()) this.overlayRef.detach();
  }

  private _setupOnRouterEventStrategy(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationStart))
      .subscribe(() => this.attach());
    this.router.events.pipe(
      filter((e) =>
        e instanceof NavigationEnd ||
        e instanceof NavigationCancel ||
        e instanceof NavigationError
      )
    ).subscribe(() => this.detach());
  }
}
