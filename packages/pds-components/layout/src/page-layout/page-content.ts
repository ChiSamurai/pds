import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-page-content',
  encapsulation: ViewEncapsulation.None,
  template: `<ng-content></ng-content>`
})
export class PdsPageContent {
}
