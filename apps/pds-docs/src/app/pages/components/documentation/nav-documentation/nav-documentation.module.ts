import { NgModule } from '@angular/core';
import { NavDocumentationComponent } from './nav-documentation.component';
import { NavDocumentationSimpleSnippetComponent } from './snippets/nav-documentation-simple-snippet/nav-documentation-simple-snippet.component';
import { PdsNavModule } from '@vitagroup/pds-components';
import { SvgIconModule } from '@vitagroup/cdk';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseDocumentationModule } from '../../base-documentation/base-documentation.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NavDocumentationComponent,
    NavDocumentationSimpleSnippetComponent
  ],
  exports: [
    NavDocumentationComponent,
    NavDocumentationSimpleSnippetComponent
  ],
  imports: [
    PdsNavModule,
    SvgIconModule,
    FlexLayoutModule,
    BaseDocumentationModule,
    CommonModule
  ]
})
export class NavDocumentationModule {
}
