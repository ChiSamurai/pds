import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { EventUnlistener } from '@vitagroup/common';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ElementFocusState } from '../element-state/element-focus-state';
import { OverlayDefBase } from './overlay-def-base';

@Directive()
export abstract class OverlayOutletBase<T extends OverlayDefBase> implements OnInit, OnDestroy {
  private _unlistener: EventUnlistener[] = [];
  private _viewRef: EmbeddedViewRef<any>;

  protected readonly focusState = new ElementFocusState(this.viewContainerRef.element, this.renderer);
  protected readonly ngDestroys = new Subject();

  protected portal: TemplatePortal;
  protected overlayRef: OverlayRef;

  deactivateOnBlur = false;
  overlayDef: T;

  get isActive(): boolean {
    return this.overlayRef.hasAttached();
  }

  readonly activates = new EventEmitter();
  readonly deactivates = new EventEmitter();

  constructor(
    protected overlay: Overlay,
    protected viewContainerRef: ViewContainerRef,
    protected renderer: Renderer2
  ) {}

  protected configureOverlay(config?: OverlayConfig): OverlayConfig {
    return new OverlayConfig({ scrollStrategy: this.overlay.scrollStrategies.close(), ...config });
  }

  protected listenUntilDestroyed(target: ElementRef | any, eventName: string, listener: EventListener): void {
    if (target instanceof ElementRef) target = target.nativeElement;
    this._unlistener.push(this.renderer.listen(target, eventName, listener));
  }

  activate(): void {
    if (this.isActive) this.deactivate();
    if (this.overlayDef != null) {
      this.portal = new TemplatePortal(this.overlayDef.template, this.viewContainerRef);
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
    this.focusState.ancestors.add(this.overlayRef.overlayElement);

    this.focusState
      .asObservable()
      .pipe(
        takeUntil(this.ngDestroys),
        filter((isFocused) => !isFocused && this.deactivateOnBlur)
      )
      .subscribe(() => this.deactivate());
  }
  ngOnDestroy() {
    for (const unlisten of this._unlistener) unlisten();
    this._unlistener = [];

    this.overlayRef.dispose();

    this.ngDestroys.next();
    this.ngDestroys.complete();
  }
}
