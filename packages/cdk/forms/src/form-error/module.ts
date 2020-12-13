import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormErrorOutlet } from './form-error-outlet';

const declarations = [
  FormErrorOutlet
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [
    CommonModule
  ]
})
export class FormErrorModule {
}
