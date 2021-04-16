import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgIconModule } from '@vitagroup/cdk';
import { PreventNativeScrollbarOffsetModule } from '@vitagroup/cdk/a11y';
import { TemplateEncapsulationModule } from '@vitagroup/cdk/layout';
import { Modal } from './modal';
import { ModalContent } from './modal-content';
import { ModalFooter } from './modal-footer';
import { ModalHeader } from './modal-header';

const declarations = [Modal, ModalHeader, ModalFooter, ModalContent];

@NgModule({
  declarations,
  exports: declarations,
  imports: [
    CommonModule,
    SvgIconModule,
    TemplateEncapsulationModule,
    ScrollingModule,
    PreventNativeScrollbarOffsetModule,
  ],
})
export class ModalModule {}
