import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, InjectionToken, Input, Renderer2 } from '@angular/core';
import { ElementDisabledState } from '../element-state/element-disabled-state';
import {
  ElementFocusAccessor,
  ElementFocusState,
  resolveElementFocusState,
} from '../element-state/element-focus-state';
import { DeselectOptions, SelectionModel, SelectionOptions, SelectOptions, ToggleOptions } from './selection-model';

export const SELECTION_VALUE = new InjectionToken<SelectionValue>('SELECTION_VALUE');

@Directive({
  exportAs: 'selectionValue',
  selector: '[selectionValue]',
  providers: [
    { provide: SELECTION_VALUE, useExisting: SelectionValue },
    { provide: ElementFocusState, useFactory: resolveElementFocusState, deps: [SelectionValue] },
  ],
})
export class SelectionValue<T = any> implements ElementFocusAccessor {
  @Input('disabled') private set _disabled(value: boolean) {
    if (coerceBooleanProperty(value)) this.disabled.set();
    else this.disabled.unset();
  }

  readonly focus = new ElementFocusState(this.elementRef, this.renderer);
  readonly disabled = new ElementDisabledState(this.elementRef, this.renderer);

  @Input('selectionValue') value: T;
  @Input('selectionOptions') options: SelectionOptions;

  get isSelected(): boolean {
    return this.value != null && this.selectionModel.isSelected(this.value);
  }

  constructor(
    readonly selectionModel: SelectionModel<T>,
    protected elementRef: ElementRef,
    protected renderer: Renderer2
  ) {}

  select(options?: SelectOptions): void {
    if (this.value != null) this.selectionModel.select(this.value, options || this.options);
  }
  deselect(options?: DeselectOptions): void {
    if (this.value != null) this.selectionModel.deselect(this.value, options || this.options);
  }

  toggle(options?: ToggleOptions): void {
    if (this.value != null) this.selectionModel.toggle(this.value, options || this.options);
  }
}
