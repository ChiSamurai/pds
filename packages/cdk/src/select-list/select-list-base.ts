import { ContentChildren, Directive, QueryList } from '@angular/core';
import { SelectionControl } from '../selection/selection-control';
import { SelectOptionBase } from './select-option-base';

@Directive()
export abstract class SelectListBase<T> extends SelectionControl<T> {
  @ContentChildren(SelectOptionBase, { descendants: true }) readonly options: QueryList<SelectOptionBase<T>>;
}
