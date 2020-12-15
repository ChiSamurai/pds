import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgIconModule } from '@vitagroup/cdk';
import { TemplateEncapsulationModule } from '@vitagroup/cdk/layout';
import { Modal } from './modal';
import { ModalFooter } from './modal-footer';
import { ModalHeader } from './modal-header';

const declarations = [
  Modal,
  ModalHeader,
  ModalFooter
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [
    CommonModule,
    SvgIconModule,
    TemplateEncapsulationModule
  ]
})
export class ModalModule {
}
