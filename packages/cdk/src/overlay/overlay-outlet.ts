import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { BasePortalOutlet, ComponentPortal, DomPortal, TemplatePortal } from "@angular/cdk/portal";
import { ComponentRef, Directive, EmbeddedViewRef, OnDestroy, OnInit } from "@angular/core";

@Directive()
export abstract class OverlayOutlet extends BasePortalOutlet implements OnInit, OnDestroy {
  overlayRef: OverlayRef;

  attachDomPortal = (portal: DomPortal) => this.overlayRef.attach(portal);

  constructor(protected overlay: Overlay) {
    super();
  }

  protected abstract configureOverlay(): OverlayConfig;

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    return this.overlayRef.attach(portal);
  }
  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    return this.overlayRef.attach(portal);
  }

  ngOnInit() {
    const config = this.configureOverlay();
    this.overlayRef = this.overlay.create(config);
  }
  ngOnDestroy() {
    this.overlayRef.dispose();
  }
}
