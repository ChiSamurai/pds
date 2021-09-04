import { coerceArray } from '@angular/cdk/coercion';
import { ConnectedPosition, Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChild,
  ContentChildren,
  Directive,
  Inject,
  InjectionToken,
  isDevMode,
  OnInit,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';
import { takeUntil } from 'rxjs/operators';
import { ComboBoxBase } from '../combo-box/combo-box-base';
import { SelectionChange, SelectionModel } from '../selection/selection-model';
import { SelectDefBase, SelectDefContext } from './select-def-base';

export const SELECT_BOX_OVERLAY_POSITIONS = new InjectionToken<ConnectedPosition[]>('SELECT_BOX_OVERLAY_POSITIONS', {
  providedIn: 'root',
  factory: /* @dynamic */ () => [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', panelClass: 'bottom' },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', panelClass: 'top' },
  ],
});

@Directive()
export abstract class SelectBoxBase<T, C extends SelectDefContext<T> = SelectDefContext<T>>
  extends ComboBoxBase<T, C>
  implements OnInit, AfterContentInit {
  @ContentChildren(SelectDefBase, { descendants: true }) protected readonly defs: QueryList<SelectDefBase<T, C>>;
  @ContentChild(SelectionModel) readonly selectionModel: SelectionModel<T>;

  protected abstract overlayTemplate: TemplateRef<any>;
  protected readonly overlayRef = this.overlay.create({
    scrollStrategy: this.overlay.scrollStrategies.close(),
    positionStrategy: this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(this.connectedPositions)
      .withPush(false),
  });

  get hasAttachedOverlay(): boolean {
    return this.overlayRef.hasAttached();
  }

  constructor(
    @Inject(WINDOW) protected window: /* @dynamic */ Window,
    @Inject(SELECT_BOX_OVERLAY_POSITIONS)
    protected connectedPositions: /* @dynamic */ ConnectedPosition[],
    protected viewContainerRef: ViewContainerRef,
    protected changeDetectorRef: ChangeDetectorRef,
    protected renderer: Renderer2,
    protected overlay: Overlay
  ) {
    super(viewContainerRef.element, changeDetectorRef, renderer);
  }

  protected onSelectionChange(change: SelectionChange): void {
    if (this.readOnly.isUnset) {
      this.setValue(change.source.toArray());
      this.changeDetectorRef.detectChanges();
    }
  }

  writeValue(obj: unknown) {
    this.selectionModel?.reset(coerceArray(obj) as T[]);
    super.writeValue(obj);
  }

  attachOverlay(): void {
    if (!this.hasAttachedOverlay) {
      const { width } = this.window.getComputedStyle(this.elementRef.nativeElement);
      this.overlayRef.updateSize({ width });
      this.overlayRef.attach(new TemplatePortal(this.overlayTemplate, this.viewContainerRef));
    }
    this.changeDetectorRef.detectChanges();
  }
  detachOverlay(): void {
    if (this.hasAttachedOverlay) {
      this.overlayRef.detach();
    }
    this.changeDetectorRef.detectChanges();
  }

  toggleOverlay(): void {
    if (this.hasAttachedOverlay) this.detachOverlay();
    else this.attachOverlay();
  }

  ngOnInit() {
    super.ngOnInit();

    this.shortcuts.register('document:esc', () => this.focus.isSet && this.detachOverlay());

    this.listenUntilDestroyed(this.elementRef, 'click', () => this.toggleOverlay());
  }
  ngAfterContentInit() {
    if (isDevMode() && this.selectionModel == null)
      console.warn(`${this.constructor.name} instantiated without a selection model as content child`);
    else {
      if (this.value) this.selectionModel.reset(this.value);
      this.selectionModel.changes.pipe(takeUntil(this.ngDestroys)).subscribe(this.onSelectionChange.bind(this));
    }
  }
}
