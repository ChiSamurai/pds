import { NgModule } from '@angular/core';
import { NavDocumentationComponent } from './nav-documentation.component';
import { PdsDividerModule, PdsNavModule } from '@vitagroup/pds-components';
import { SvgIconModule } from '@vitagroup/cdk';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseDocumentationModule } from '../../base-documentation/base-documentation.module';
import { CommonModule } from '@angular/common';
import { NavDocumentationConditionalTemplatesSnippetModule } from './snippets/nav-documentation-conditional-templates-snippet/nav-documentation-conditional-templates-snippet.module';
import { NavDocumentationEntryCustomizedSnippetModule } from './snippets/nav-documentation-entry-customized-snippet/nav-documentation-entry-customized-snippet.module';
import { NavDocumentationEntryTemplatesSnippetModule } from './snippets/nav-documentation-entry-templates-snippet/nav-documentation-entry-templates-snippet.module';
import { NavDocumentationEntryIconsSnippetModule } from './snippets/nav-documentation-entry-icons-snippet/nav-documentation-entry-icons-snippet.module';
import { NavDocumentationSimpleSnippetModule } from './snippets/nav-documentation-simple-snippet/nav-documentation-simple-snippet.module';

@NgModule({
  declarations: [
    NavDocumentationComponent
  ],
  exports: [
    NavDocumentationComponent
  ],
  imports: [
    PdsNavModule,
    SvgIconModule,
    FlexLayoutModule,
    BaseDocumentationModule,
    CommonModule,
    PdsDividerModule,
    NavDocumentationEntryCustomizedSnippetModule,
    NavDocumentationEntryTemplatesSnippetModule,
    NavDocumentationEntryIconsSnippetModule,
    NavDocumentationConditionalTemplatesSnippetModule,
    NavDocumentationSimpleSnippetModule
  ]
})
export class NavDocumentationModule {
}
