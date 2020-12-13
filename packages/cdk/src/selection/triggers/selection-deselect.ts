import { Directive } from '@angular/core';
import { SelectOptions } from '../selection-model';
import { SelectionTrigger } from '../selection-trigger';

@Directive({
  selector: '[selectionDeselect]',
  inputs: [
    'triggerEvent: selectionDeselectTrigger',
    'isDisabled: selectionDeselectDisabled',
    'options: selectionDeselectOptions',
  ],
})
export class SelectionDeselect<T> extends SelectionTrigger<T> {
  trigger(options?: SelectOptions): void {
    this.value.deselect(options || this.options);
  }
}
