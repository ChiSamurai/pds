import { Component, ViewEncapsulation } from '@angular/core';
import { PageHeader } from './page-header';

@Component({
  selector: 'page-header-content',
  styles: [ 'page-header-content { display: block }' ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngTemplateOutlet="pageHeader.contentTemplate"></ng-container>`
})
export class PageHeaderContent {
  constructor(readonly pageHeader: PageHeader) {
  }
}
