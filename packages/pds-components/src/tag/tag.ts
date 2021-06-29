import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-tag',
  styleUrls: ['./tag.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>
  `,
})
export class PdsTag {}
