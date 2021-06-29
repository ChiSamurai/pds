import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TemplateEncapsulationModule } from '@vitagroup/cdk/layout';
import { TemplateOutletModule } from '@vitagroup/common';
import { PdsPageContent } from './page-content';
import { PdsPageFooter } from './page-footer';
import { PdsPageHeader } from './page-header';
import { PdsPageLayout } from './page-layout';

const declarations = [PdsPageLayout, PdsPageHeader, PdsPageFooter, PdsPageContent];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule, ScrollingModule, TemplateEncapsulationModule, TemplateOutletModule],
})
export class PdsPageLayoutModule {}
