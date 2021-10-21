import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StepDef } from './step-def';
import { StepLayout } from './step-layout';

const declarations = [StepLayout, StepDef];

/** @deprecated Use {@link StepModel} instead */
@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class StepLayoutModule {}
