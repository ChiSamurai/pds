import { Component, ViewEncapsulation } from '@angular/core';
import { PageHeader } from '@vitagroup/cdk/layout';

@Component({
  selector: 'pds-app-header',
  styleUrls: ['app-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="page-headline body-small">
      <ng-container *ngIf="'title' | routeData | async as title">
        <span class="page-title uppercase">{{ title }}</span>
      </ng-container>
    </div>
  `,
})
export class AppHeaderComponent {
  constructor(readonly parent: PageHeader) {}
}
