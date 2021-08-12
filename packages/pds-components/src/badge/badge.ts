import { Component, NgModule, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-badge',
  styleUrls: ['./badge.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>
  `,
})
export class PdsBadge {}

@NgModule({
  declarations: [PdsBadge],
  exports: [PdsBadge],
})
export class PdsBadgeModule {}
