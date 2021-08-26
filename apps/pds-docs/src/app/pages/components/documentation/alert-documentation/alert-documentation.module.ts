import { NgModule } from '@angular/core';
import { Example1Component } from './snippets/example1.component';
import { AlertDocumentationComponent } from './alert-documentation.component';
import { BaseDocumentationModule } from '../../base-documentation/base-documentation.module';
import { AlertModule } from '@vitagroup/pds-components';
import { SvgIconModule } from '@vitagroup/cdk';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [Example1Component, AlertDocumentationComponent],
  imports: [CommonModule, BaseDocumentationModule, AlertModule, SvgIconModule],
  exports: [AlertDocumentationComponent]
})
export class AlertDocumentationModule {
}

