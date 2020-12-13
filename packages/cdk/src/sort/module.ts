import { NgModule } from '@angular/core';
import { SortGroup } from './sort-group';
import { SortToggle } from './sort-toggle';

const declarations = [
  SortToggle,
  SortGroup
];

@NgModule({
  declarations,
  exports: declarations
})
export class SortModule {
}
