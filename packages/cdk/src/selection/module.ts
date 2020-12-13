import { NgModule } from '@angular/core';
import { SelectionControl } from './selection-control';
import { SelectionValue } from './selection-value';
import { SelectionDeselect } from './triggers/selection-deselect';
import { SelectionSelect } from './triggers/selection-select';
import { SelectionToggle } from './triggers/selection-toggle';

const declarations = [
  SelectionControl,
  SelectionValue,
  SelectionSelect,
  SelectionDeselect,
  SelectionToggle,
];

@NgModule({
  declarations,
  exports: declarations,
})
export class SelectionModule {}
