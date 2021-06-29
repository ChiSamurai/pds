import { NgModule } from '@angular/core';
import { PdsSelectList } from './select-list';
import { PdsSelectOption } from './select-option';

const declarations = [PdsSelectList, PdsSelectOption];

@NgModule({
  declarations,
  exports: declarations,
})
export class PdsSelectListModule {}
