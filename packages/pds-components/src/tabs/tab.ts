import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-tab',
  styleUrls: [ 'tab.scss' ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>`
})
export class Tab {
}
