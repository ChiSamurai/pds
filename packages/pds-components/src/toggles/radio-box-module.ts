import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PdsRadioBox } from './radio-box';
import { PdsRadioGroup } from './radio-group';

const declarations = [PdsRadioGroup, PdsRadioBox];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class PdsRadioBoxModule {}
