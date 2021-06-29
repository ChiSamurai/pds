import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TemplateOutletModule } from '@vitagroup/common';
import { PdsComboBox } from './combo-box';
import { PdsComboDef } from './combo-def';

const declarations = [PdsComboBox, PdsComboDef];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule, TemplateOutletModule],
})
export class PdsComboBoxModule {}
