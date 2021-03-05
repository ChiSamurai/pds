import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-alert',
  styleUrls: ['./alert.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content select="[pdsBefore]"></ng-content>
    <div>
      <ng-content></ng-content>
    </div>
    <ng-content select="[pdsAfter]"></ng-content>
  `,
})
export class Alert {}
