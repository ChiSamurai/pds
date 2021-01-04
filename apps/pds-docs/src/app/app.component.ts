import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-app',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <pds-nav>
      <div class="pds-app-branding">
        <svg-icon name="vitagroup-signet" size="32px"></svg-icon>
        <span class="pds-app-brand">
          <strong>PDS</strong>
          &nbsp;Docs
        </span>
      </div>

      <pds-nav-entry *navEntryDef="let entry" [entry]="entry" routerLinkActive="active">
        <svg-icon *ngIf="entry.iconName" [name]="entry.iconName"></svg-icon>
        <span>{{ entry.name }}</span>
      </pds-nav-entry>
    </pds-nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
