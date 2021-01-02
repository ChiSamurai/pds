import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TemplateOutletModule } from '@vitagroup/common';
import { ComboBox } from './combo-box';
import { ComboDef } from './combo-def';

const declarations = [ComboBox, ComboDef];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule, TemplateOutletModule],
})
export class ComboBoxModule {}
