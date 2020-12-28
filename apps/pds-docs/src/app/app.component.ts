import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-app',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <pds-main-menu>
      <div class="pds-app-branding">
        <svg-icon name="vitagroup-signet" size="32px"></svg-icon>
        <div class="pds-app-brand">
          <strong>PDS</strong>
          &nbsp;Docs
        </div>
      </div>
    </pds-main-menu>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
