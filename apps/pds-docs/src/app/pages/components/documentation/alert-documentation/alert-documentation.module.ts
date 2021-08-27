import { NgModule } from '@angular/core';
import { AlertDocumentationComponent } from './alert-documentation.component';
import { BaseDocumentationModule } from '../../base-documentation/base-documentation.module';
import { AlertModule } from '@vitagroup/pds-components';
import { SvgIconModule } from '@vitagroup/cdk';
import { CommonModule } from '@angular/common';
import { AlertDocumentationBasicSnippetModule } from './snippets/alert-documentation-basic-snippet/alert-documentation-basic-snippet.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AlertDocumentationComponent],
  imports: [CommonModule, BaseDocumentationModule, AlertModule, SvgIconModule, FlexLayoutModule, AlertDocumentationBasicSnippetModule],
  exports: [AlertDocumentationComponent]
})
export class AlertDocumentationModule {
}

