import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';
import { AppGuidesService } from './services/app-guides.service';

@Component({
  selector: 'pds-app',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pds-nav>
      <div class="pds-app-branding">
        <svg-icon name="vitagroup-signet" size="32px"></svg-icon>
        <span class="pds-app-brand">
          <strong>PDS</strong>
          &nbsp;Docs
        </span>
      </div>
      <pds-app-search></pds-app-search>
      <pds-nav-entry
        *navEntryDef="let entry"
        [entry]="entry"
        [routerLinkActiveOptions]="{ exact: entry.linkUrl === '/' }"
        routerLinkActive="active"
      >
        <svg-icon [name]="entry.iconName" *ngIf="entry.iconName" pdsBefore></svg-icon>
        <span>{{ entry.name }}</span>
      </pds-nav-entry>
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

  constructor(
    @Inject(DOCUMENT) readonly document: Document,
    @Inject(WINDOW) protected window: Window,
    readonly appGuides: AppGuidesService
  ) {}

  ngOnInit() {
    const colorSchemeMediaQuery = this.window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeMediaQuery.addEventListener('change', ({ matches }) => (this.darkMode = matches));
    this.darkMode = colorSchemeMediaQuery.matches;
  }
}
