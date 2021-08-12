import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { PdsInputDropdownDef } from './input-dropdown-def';
import { PdsInputDropdownOutlet } from './input-dropdown-outlet';
import { PdsInputFilterPipe } from './input-filter';

export const declarations = [PdsInputDropdownOutlet, PdsInputDropdownDef, PdsInputFilterPipe];

@NgModule({
  declarations,
  exports: declarations,
  imports: [OverlayModule],
})
export class PdsInputDropdownModule {}
