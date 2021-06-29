import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-card-header',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>
  `,
})
export class PdsCardHeader {}

@Component({
  selector: 'pds-card-content',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>
  `,
})
export class PdsCardContent {}

@Component({
  selector: 'pds-card-footer',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>
  `,
})
export class PdsCardFooter {}
