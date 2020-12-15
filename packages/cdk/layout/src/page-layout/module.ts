import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TemplateEncapsulationModule } from '../encapsulation/module';
import { PageContent } from './page-content';
import { PageFooter } from './page-footer';
import { PageHeader } from './page-header';
import { PageLayout } from './page-layout';

const declarations = [
  PageLayout,
  PageHeader,
  PageFooter,
  PageContent
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [
    CommonModule,
    ScrollingModule,
    TemplateEncapsulationModule
  ]
})
export class PageLayoutModule {
}
