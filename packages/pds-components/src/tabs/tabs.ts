import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-tabs',
  styleUrls: ['tabs.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>
  `,
})
export class PdsTabs {}
