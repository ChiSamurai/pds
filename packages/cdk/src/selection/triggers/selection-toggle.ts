import { Directive } from '@angular/core';
import { SelectOptions } from '../selection-model';
import { SelectionTrigger } from '../selection-trigger';

@Directive({
  selector: '[selectionToggle]',
  inputs: [
    'triggerEvent: selectionToggleTrigger',
    'isDisabled: selectionToggleDisabled',
    'options: selectionToggleOptions',
  ],
})
export class SelectionToggle<T> extends SelectionTrigger<T> {
  trigger(options?: SelectOptions): void {
    this.value.toggle(options || this.options);
  }
}
