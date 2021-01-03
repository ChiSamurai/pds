import { ConnectedPosition, Overlay } from '@angular/cdk/overlay';
import { Portal, TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  ElementRef,
  Inject,
  InjectionToken,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ComboBoxBase } from '../combo-box/combo-box-base';
import { SelectDefBase, SelectDefContext } from './select-def-base';
import { SelectOptionBase } from './select-option-base';

export const SELECT_BOX_CONNECTED_POSITIONS = new InjectionToken<ConnectedPosition[]>(
  'SELECT_BOX_CONNECTED_POSITIONS',
  {
    providedIn: 'root',
    factory: () => [
      { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', panelClass: 'bottom' },
      { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', panelClass: 'top' },
    ],
  }
);

@Directive()
export abstract class SelectBoxBase<T, C extends SelectDefContext<T> = SelectDefContext<T>> extends ComboBoxBase<T, C> {
  @ContentChildren(SelectDefBase, { descendants: true }) protected readonly defs: QueryList<SelectDefBase<T, C>>;
  @ContentChildren(SelectOptionBase, { descendants: true }) readonly options: QueryList<SelectOptionBase<T>>;

  protected abstract optionsTemplate: TemplateRef<any>;
  protected readonly optionsOverlayRef = this.overlay.create({
    scrollStrategy: this.overlay.scrollStrategies.close(),
    positionStrategy: this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(this.connectedPositions)
      .withPush(false),
  });

  get hasAttachedOptions(): boolean {
    return this.optionsOverlayRef.hasAttached();
  }

  constructor(
    @Inject(SELECT_BOX_CONNECTED_POSITIONS)
    protected connectedPositions: /* @dynamic */ ConnectedPosition[],
    protected viewContainerRef: ViewContainerRef,
    protected changeDetectorRef: ChangeDetectorRef,
    protected renderer: Renderer2,
    protected overlay: Overlay
  ) {
    super(viewContainerRef.element, changeDetectorRef, renderer);
  }

  attachOptions(): void {
    if (!this.hasAttachedOptions) {
      const { clientWidth: width } = this.elementRef.nativeElement as HTMLElement;
      this.optionsOverlayRef.updateSize({ width });
      this.optionsOverlayRef.attach(new TemplatePortal(this.optionsTemplate, this.viewContainerRef));
    }
  }
  detachOptions(): void {
    if (this.hasAttachedOptions) {
      this.optionsOverlayRef.detach();
    }
  }

  toggleOptions(): void {
    if (this.hasAttachedOptions) this.detachOptions();
    else this.attachOptions();
  }
}
