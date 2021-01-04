import { NgModule } from '@angular/core';
import { SelectList } from './select-list';
import { SelectOption } from './select-option';

const declarations = [SelectList, SelectOption];

@NgModule({
  declarations,
  exports: declarations,
})
export class SelectListModule {}
