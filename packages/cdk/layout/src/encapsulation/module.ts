import { NgModule } from '@angular/core';
import { TemplateEncapsulate } from './template-encapsulate';
import { TemplateEncapsulateOutlet } from './template-encapsulate-outlet';

const declarations = [
  TemplateEncapsulate,
  TemplateEncapsulateOutlet
];

@NgModule({
  declarations,
  exports: declarations
})
export class TemplateEncapsulationModule {
}
