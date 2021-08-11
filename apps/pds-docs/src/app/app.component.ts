import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';

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
          [routerLinkActiveOptions]="{ exact: entry.linkUrl === '/' }"
          routerLinkActive="active"
        >
          <svg-icon [name]="entry.iconName" *ngIf="entry.iconName" pdsBefore></svg-icon>
          <span>{{ entry.name }}</span>
          <svg-icon fallback="expand" pdsAfter></svg-icon>
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
export class AppComponent implements OnInit {
  set darkMode(value: boolean) {
    if (value) this.document.body.classList.add('dark');
    else this.document.body.classList.remove('dark');
  }
  get darkMode(): boolean {
    return this.document.body.classList.contains('dark');
  }

  constructor(@Inject(DOCUMENT) readonly document: Document, @Inject(WINDOW) protected window: Window) {}

  ngOnInit() {
    const colorSchemeMediaQuery = this.window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeMediaQuery.addEventListener('change', ({ matches }) => (this.darkMode = matches));
    this.darkMode = colorSchemeMediaQuery.matches;
  }
}
