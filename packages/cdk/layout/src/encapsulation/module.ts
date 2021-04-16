import { NgModule } from '@angular/core';
import { TemplateEncapsulate } from './template-encapsulate';

const declarations = [TemplateEncapsulate];

@NgModule({
  declarations,
  exports: declarations,
})
export class TemplateEncapsulationModule {}
