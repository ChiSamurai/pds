import { Component, Predicate, ViewEncapsulation } from '@angular/core';
import { NavigationEntry } from '@vitagroup/cdk';

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

      <ng-container *navEntryDef="let entry; when: isIconEntry">
        <div class="nav-entry" [navEntryLink]="entry">
          <svg-icon [name]="entry.iconName"></svg-icon>
          <span>{{ entry.name }}</span>
        </div>
      </ng-container>
    </pds-main-menu>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  readonly isIconEntry: Predicate<NavigationEntry> = (entry) => entry.iconName != null;
}
