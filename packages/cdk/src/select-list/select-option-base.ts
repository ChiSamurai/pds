import { Directive, Input } from '@angular/core';
import { SelectionValue } from '../selection/selection-value';

@Directive()
export abstract class SelectOptionBase<T> extends SelectionValue<T> {
  @Input() value: T;
}
