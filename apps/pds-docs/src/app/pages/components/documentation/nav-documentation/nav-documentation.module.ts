import { NgModule } from '@angular/core';
import { NavDocumentationComponent } from './nav-documentation.component';
import { NavDocumentationSimpleSnippetComponent } from './snippets/nav-documentation-simple-snippet/nav-documentation-simple-snippet.component';
import { PdsDividerModule, PdsNavModule } from '@vitagroup/pds-components';
import { SvgIconModule } from '@vitagroup/cdk';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseDocumentationModule } from '../../base-documentation/base-documentation.module';
import { CommonModule } from '@angular/common';
import { NavDocumentationEntryTemplatesSnippetComponent } from './snippets/nav-documentation-entry-templates-snippet/nav-documentation-entry-templates-snippet.component';
import { NavDocumentationConditionalTemplatesSnippetComponent } from './snippets/nav-documentation-conditional-templates-snippet/nav-documentation-conditional-templates-snippet.component';
import { NavDocumentationEntryIconsSnippetComponent } from './snippets/nav-documentation-entry-icons-snippet/nav-documentation-entry-icons-snippet.component';
import { NavDocumentationEntryCustomizedSnippetComponent } from './snippets/nav-documentation-entry-customized-snippet/nav-documentation-entry-customized-snippet.component';

@NgModule({
  declarations: [
    NavDocumentationComponent,
    NavDocumentationSimpleSnippetComponent,
    NavDocumentationEntryTemplatesSnippetComponent,
    NavDocumentationConditionalTemplatesSnippetComponent,
    NavDocumentationEntryIconsSnippetComponent,
    NavDocumentationEntryCustomizedSnippetComponent
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
    PdsDividerModule
  ]
})
export class NavDocumentationModule {
}
