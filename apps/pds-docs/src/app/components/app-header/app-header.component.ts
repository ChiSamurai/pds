import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-app-header',
  styleUrls: ['app-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="page-headline body-small">
      <!-- todo(@janunld): integrate pds-breadcrumbs as soon as implemented -->
      <span class="capitalized">Product Design System</span>
      &mdash;
      <span class="page-title">{{ 'title' | routeData | async }}</span>
    </div>
    <div class="app-search">
      <input placeholder="Search anything..." />
    </div>
  `,
})
export class AppHeaderComponent {}
