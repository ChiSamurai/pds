import { NgModule } from '@angular/core';
import { AlertDocumentationComponent } from './alert-documentation.component';
import { BaseDocumentationModule } from '../../base-documentation/base-documentation.module';
import { AlertModule } from '@vitagroup/pds-components';
import { SvgIconModule } from '@vitagroup/cdk';
import { CommonModule } from '@angular/common';
import { AlertDocumentationBasicSnippetComponent } from './snippets/alert-documentation-basic-snippet/alert-documentation-basic-snippet.component';

@NgModule({
  declarations: [AlertDocumentationBasicSnippetComponent, AlertDocumentationComponent],
  imports: [CommonModule, BaseDocumentationModule, AlertModule, SvgIconModule],
  exports: [AlertDocumentationComponent]
})
export class AlertDocumentationModule {
}

