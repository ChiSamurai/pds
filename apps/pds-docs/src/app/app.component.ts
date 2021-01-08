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

      <ng-template #navEntryWithIcon let-entry>
        <pds-nav-entry
          [entry]="entry"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: entry.linkUrl === '/' }"
        >
          <svg-icon *ngIf="entry.iconName" [name]="entry.iconName"></svg-icon>
          <span>{{ entry.name }}</span>
        </pds-nav-entry>
      </ng-template>
      <ng-container *navEntryDef="let entry">
        <ng-container *ngTemplateOutlet="navEntryWithIcon; context: { $implicit: entry }"></ng-container>
        <div class="nav-entry-children" *ngIf="entry.children?.length > 0">
          <ng-container *ngFor="let childEntry of entry.children">
            <ng-container *ngTemplateOutlet="navEntryWithIcon; context: { $implicit: childEntry }"></ng-container>
          </ng-container>
        </div>
      </ng-container>
    </pds-nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
