import { Directive } from '@angular/core';
import { SelectionControl } from '../selection/selection-control';
import { SelectOptions, ToggleOptions } from '../selection/selection-model';

@Directive()
export abstract class SelectListBase<T> extends SelectionControl<T> {
  selectAll(options?: SelectOptions): void {
    for (const value of this.selectionValues.toArray()) value.select(options);
  }
  toggleAll(options?: ToggleOptions): void {
    for (const value of this.selectionValues.toArray()) value.toggle(options);
  }
}
