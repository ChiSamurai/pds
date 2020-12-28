import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-app-footer',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['app-footer.component.scss'],
  template: `
    <div class="app-legal-links">
      <a>Impressum</a>
      <a>Datenschutz</a>
    </div>
    <div class="app-legal-claims small">
      <span>vitagroup AG &copy; 2020</span>
      &mdash;
      <span>
        licensed under
        <strong>Apache-2.0</strong>
      </span>
    </div>
  `,
})
export class AppFooterComponent {}
