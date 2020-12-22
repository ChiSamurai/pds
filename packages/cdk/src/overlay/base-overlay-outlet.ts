import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, EmbeddedViewRef, EventEmitter, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { BaseOverlayDef } from './base-overlay-def';

@Directive()
export abstract class BaseOverlayOutlet<T extends BaseOverlayDef> implements OnInit, OnDestroy {
  private _viewRef: EmbeddedViewRef<any>;
  private _overlayDef: T;

  protected portal: TemplatePortal;
  protected overlayRef: OverlayRef;

  set overlayDef(value: T) {
    this._overlayDef = this.setOverlayDef(value);
  }
  get overlayDef(): T {
    return this._overlayDef;
  }

  get isActive(): boolean {
    return this.overlayRef.hasAttached();
  }

  readonly activates = new EventEmitter();
  readonly deactivates = new EventEmitter();

  constructor(protected overlay: Overlay, protected viewContainerRef: ViewContainerRef) {}

  protected abstract configureOverlay(): OverlayConfig;

  protected setOverlayDef(value: T): T {
    this.portal = new TemplatePortal(value.template, this.viewContainerRef);
    return value;
  }

  activate(): void {
    if (this.isActive) this.deactivate();
    if (this.overlayDef != null) {
      this._viewRef = this.overlayRef.attach(this.portal);
    }
  }
  deactivate(): void {
    if (this.overlayDef != null) {
      this.overlayRef.detach();
    }
  }

  ngOnInit() {
    const config = this.configureOverlay();
    this.overlayRef = this.overlay.create(config);
  }
  ngOnDestroy() {
    this.overlayRef.dispose();
  }
}
