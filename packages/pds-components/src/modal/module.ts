import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgIconModule } from '@vitagroup/cdk';
import { TemplateEncapsulationModule } from '@vitagroup/cdk/layout';
import { PdsModal } from './modal';
import { PdsModalContent } from './modal-content';
import { PdsModalFooter } from './modal-footer';
import { PdsModalHeader } from './modal-header';

const declarations = [PdsModal, PdsModalHeader, PdsModalFooter, PdsModalContent];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule, SvgIconModule, TemplateEncapsulationModule, ScrollingModule],
})
export class PdsModalModule {}
