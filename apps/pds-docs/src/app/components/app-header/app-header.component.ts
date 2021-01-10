import { Component, ViewEncapsulation } from '@angular/core';
import { PageHeader } from '@vitagroup/cdk/layout';

@Component({
  selector: 'pds-app-header',
  styleUrls: ['app-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="page-headline body-small">
      <!-- todo(@janunld): integrate pds-breadcrumbs as soon as implemented -->
      <span class="capitalized">Product Design System</span>
      <ng-container *ngIf="'title' | routeData | async as title">
        &mdash;
        <span class="page-title">{{ title }}</span>
      </ng-container>
    </div>
    <!--<div class="app-search">
      <pds-text-box placeholder="Search...">
        <svg-icon name="search" textSuffix></svg-icon>
      </pds-text-box>
    </div>-->
  `,
})
export class AppHeaderComponent {
  constructor(readonly parent: PageHeader) {}
}
