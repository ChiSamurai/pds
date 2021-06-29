import { NgModule } from '@angular/core';
import { PdsTextBox } from './text-box';

const declarations = [PdsTextBox];

@NgModule({
  declarations,
  exports: declarations,
})
export class PdsTextBoxModule {}
