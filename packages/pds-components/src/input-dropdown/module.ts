import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { DefaultControlInputAccessorModule } from '@vitagroup/cdk';
import { InputDropdownDef } from './input-dropdown-def';
import { InputDropdownOutlet } from './input-dropdown-outlet';
import { InputFilterPipe } from './input-filter';

export const declarations = [InputDropdownOutlet, InputDropdownDef, InputFilterPipe];

@NgModule({
  declarations,
  exports: declarations,
  imports: [DefaultControlInputAccessorModule, OverlayModule],
})
export class InputDropdownModule {}
