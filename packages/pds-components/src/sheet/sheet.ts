import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-sheet',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['sheet.scss'],
  template: `
    <ng-content></ng-content>
  `
})
export class PdsSheet {
}
