import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-chip',
  styleUrls: ['./chip.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>
  `,
})
export class PdsChip {}
