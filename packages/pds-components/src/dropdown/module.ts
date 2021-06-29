import { NgModule } from '@angular/core';
import { PdsDropdown } from './dropdown';
import { PdsDropdownDef } from './dropdown-def';
import { PdsDropdownOutlet } from './dropdown-outlet';

const declarations = [PdsDropdown, PdsDropdownDef, PdsDropdownOutlet];

@NgModule({
  declarations,
  exports: declarations,
  imports: [],
})
export class PdsDropdownModule {}
