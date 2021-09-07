import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';
import { Theme } from '@vitagroup/cdk';
import { AppDocService } from './services/app-doc.service';

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
        <span>{{ entry.name | titlecase }}</span>
      </pds-nav-entry>
    </pds-nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  set darkMode(value: boolean) {
    if (value) this.theme.activate('dark');
    else this.theme.deactivate('dark');
  }
  get darkMode(): boolean {
    return this.theme.isActive('dark');
  }

  set roundMode(value: boolean) {
    this.theme.setProperty('--rounding', (value ? 1 : 0).toString());
  }
  get roundMode(): boolean {
    return !!parseInt(this.theme.getProperty('--rounding') || '1');
  }

  constructor(@Inject(WINDOW) protected window: Window, readonly docs: AppDocService, protected theme: Theme) {}

  ngOnInit() {
    const colorSchemeMediaQuery = this.window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeMediaQuery.addEventListener('change', ({ matches }) => (this.darkMode = matches));
    this.darkMode = colorSchemeMediaQuery.matches;
  }
}
