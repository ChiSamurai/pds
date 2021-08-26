import { BaseDocumentationCardComponent } from './base-documentation-card/base-documentation-card.component';
import { BaseDocumentationComponent } from './base-documentation.component';
import { NgModule } from '@angular/core';
import { PdsPageLayoutModule } from '@vitagroup/pds-components/layout';
import { CommonModule } from '@angular/common';
import { CardModule, PdsTabsModule } from '@vitagroup/pds-components';
import { MarkedPipeModule } from '../../../pipes/marked.pipe';
import { SnippetSourceComponent } from './base-snippet/snippet-source.component';
import { HighlightJsPipeModule } from '../../../pipes/highlightjs.pipe';

@NgModule({
  declarations: [BaseDocumentationCardComponent, BaseDocumentationComponent, SnippetSourceComponent],
  exports: [BaseDocumentationCardComponent, BaseDocumentationComponent, SnippetSourceComponent],
  imports: [
    CommonModule,
    PdsPageLayoutModule,
    CardModule,
    PdsTabsModule,
    MarkedPipeModule,
    HighlightJsPipeModule

  ]
})
export class BaseDocumentationModule {

}
