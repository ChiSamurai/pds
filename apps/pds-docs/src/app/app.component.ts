import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';
import { Toaster } from '@vitagroup/cdk';

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

      <ng-template #navEntryWithIcon let-entry>
        <pds-nav-entry
          [entry]="entry"
          [routerLinkActiveOptions]="{ exact: entry.linkUrl === '/' }"
          routerLinkActive="active"
        >
          <svg-icon [name]="entry.iconName" *ngIf="entry.iconName" pdsBefore></svg-icon>
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

    <pds-banner *toastDef="let message; as: 'confirm'; let toast = toast">
      <span pdsBefore>🍪</span>
      <div [innerHTML]="message | md"></div>
      <button class="small" (click)="toast.dispose(false)" pdsAfter>Decline</button>
      <button class="small" (click)="toast.dispose(true)" pdsAfter>Accept</button>
    </pds-banner>
    <pds-banner class="success" *toastDef="let message; as: 'success'">
      <span pdsBefore>🎉</span>
      <div [innerHTML]="message | md"></div>
    </pds-banner>
    <pds-banner class="warning" *toastDef="let message; as: 'warning'">
      <span pdsBefore>😢</span>
      <div [innerHTML]="message | md"></div>
    </pds-banner>
  `,
})
export class AppComponent implements OnInit, AfterViewInit {
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
    protected toaster: Toaster
  ) {}

  ngOnInit() {
    const colorSchemeMediaQuery = this.window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeMediaQuery.addEventListener('change', ({ matches }) => (this.darkMode = matches));
    this.darkMode = colorSchemeMediaQuery.matches;
  }
  ngAfterViewInit() {
    this.testUnnecessaryCookieToastFlow();
  }

  async testUnnecessaryCookieToastFlow() {
    const didConfirm = await this.toaster
      .push('We are using **cookies**, mainly **to improve our service**. [Read more 🠒](./cookies)', {
        type: 'confirm',
        position: ['center', 'bottom'],
      })
      .pop()
      .toPromise();
    if (didConfirm)
      this.toaster.pushSuccess('Thanks for accepting! **You can revoke you consent at any time**').pop(4000);
    else this.toaster.pushWarning('We are sorry to hear that. _You can change you mind at any time_').pop(4000);
  }
}
