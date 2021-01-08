import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RadioBox } from './radio-box';
import { RadioGroup } from './radio-group';

const declarations = [RadioGroup, RadioBox];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class RadioBoxModule {}
