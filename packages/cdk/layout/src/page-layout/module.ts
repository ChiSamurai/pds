import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PreventNativeScrollbarOffsetModule } from '@vitagroup/cdk/a11y';
import { StringInterpolateModule } from '@vitagroup/common';
import { FlexContainerModule } from '../flex-container/module';
import { PageContent } from './page-content';
import { PageFooter } from './page-footer';
import { PageHeader } from './page-header';
import { PageHeaderContent } from './page-header-content';
import { PageLayout } from './page-layout';

const declarations = [
  PageHeader,
  PageHeaderContent,
  PageLayout,
  PageFooter,
  PageContent
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [
    CommonModule,
    StringInterpolateModule,
    PreventNativeScrollbarOffsetModule,
    FlexContainerModule,
    RouterModule
  ]
})
export class PageLayoutModule {
}
