import { NgModule } from '@angular/core';
import { Dropdown } from './dropdown';
import { DropdownDef } from './dropdown-def';
import { DropdownOutlet } from './dropdown-outlet';

const declarations = [Dropdown, DropdownDef, DropdownOutlet];

@NgModule({
  declarations,
  exports: declarations,
  imports: [],
})
export class DropdownModule {}
