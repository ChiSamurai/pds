import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-banner',
  styleUrls: ['./banner.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content select="[pdsBefore]"></ng-content>
    <div>
      <ng-content></ng-content>
    </div>
    <ng-content select="[pdsAfter]"></ng-content>
  `,
})
export class PdsBanner {}
