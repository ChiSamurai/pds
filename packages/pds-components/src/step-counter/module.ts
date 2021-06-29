import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PdsStepCounter } from './step-counter';

const declarations = [PdsStepCounter];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class PdsStepCounterModule {}
