import { ContentChildren, Directive, QueryList } from '@angular/core';
import { SelectionControl } from '../selection/selection-control';
import { SelectOptions, ToggleOptions } from '../selection/selection-model';
import { SelectOptionBase } from './select-option-base';

@Directive()
export abstract class SelectListBase<T> extends SelectionControl<T> {
  @ContentChildren(SelectOptionBase, { descendants: true }) readonly options: QueryList<SelectOptionBase<T>>;

  selectAll(options?: SelectOptions): void {
    for (const option of this.options.toArray()) option.select(options);
  }
  toggleAll(options?: ToggleOptions): void {
    for (const option of this.options.toArray()) option.toggle(options);
  }
}
