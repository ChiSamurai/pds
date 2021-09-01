import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { EventUnlistener, ShortcutManager } from '@vitagroup/common';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ElementFocusState } from '../element-state/element-focus-state';
import { OverlayDefBase } from './overlay-def-base';

export interface OverlayDeactivateOptions {
  setFocus?: boolean;
}

@Directive()
export abstract class OverlayOutletBase<T extends OverlayDefBase> implements OnInit, OnDestroy {
  private _unlistener: EventUnlistener[] = [];
  private _viewRef: EmbeddedViewRef<any>;

  protected readonly focus: ElementFocusState;
  protected readonly ngDestroys = new Subject();

  protected portal: TemplatePortal;
  protected overlayRef: OverlayRef;

  readonly shortcuts = new ShortcutManager(this.renderer, this.viewContainerRef.element);

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
    protected renderer: Renderer2,
    @Optional() focus?: ElementFocusState
  ) {
    this.focus = focus || new ElementFocusState(this.viewContainerRef.element, this.renderer);
  }

  protected configureOverlay(config?: OverlayConfig): OverlayConfig {
    return new OverlayConfig({ scrollStrategy: this.overlay.scrollStrategies.close(), ...config });
  }

  protected listenUntilDestroyed(target: ElementRef | any, eventName: string, listener: EventListener): void {
    if (target instanceof ElementRef) target = target.nativeElement;
    this._unlistener.push(this.renderer.listen(target, eventName, listener));
  }

  protected onEscShortcut(): void {
    if (this.isActive) this.deactivate();
  }

  activate(): void {
    if (this.isActive) this.deactivate();
    if (this.overlayDef != null) {
      this.portal = new TemplatePortal(this.overlayDef.template, this.viewContainerRef);
      this._viewRef = this.overlayRef.attach(this.portal);
    }
  }
  deactivate(options?: OverlayDeactivateOptions): void {
    if (this.overlayDef != null) {
      this.overlayRef.detach();
    }

    if (options?.setFocus) this.focus.set();
  }

  ngOnInit() {
    const config = this.configureOverlay();
    this.overlayRef = this.overlay.create(config);
    this.focus.ancestors.add(this.overlayRef.overlayElement);

    this.shortcuts.register('document:esc', () => this.onEscShortcut());

    this.focus
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
