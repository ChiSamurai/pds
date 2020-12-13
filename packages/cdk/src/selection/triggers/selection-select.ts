import { Directive } from '@angular/core';
import { SelectOptions } from '../selection-model';
import { SelectionTrigger } from '../selection-trigger';

@Directive({
  selector: '[selectionSelect]',
  inputs: [
    'triggerEvent: selectionSelectTrigger',
    'isDisabled: selectionSelectDisabled',
    'options: selectionSelectOptions',
  ],
})
export class SelectionSelect<T> extends SelectionTrigger<T> {
  trigger(options?: SelectOptions): void {
    this.value.select(options || this.options);
  }
}
