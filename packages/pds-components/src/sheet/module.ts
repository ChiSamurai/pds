import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PdsSheet } from './sheet';

const declarations = [PdsSheet];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class PdsSheetModule {}
