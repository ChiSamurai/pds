import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgIconModule } from '@vitagroup/cdk';
import { PdsSelectBox } from './select-box';
import { PdsSelectDef } from './select-def';

const declarations = [PdsSelectBox, PdsSelectDef];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule, OverlayModule, SvgIconModule],
})
export class PdsSelectBoxModule {}
