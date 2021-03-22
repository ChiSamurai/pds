import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WINDOW } from '@ng-web-apis/common';
import { PageHeader } from '@vitagroup/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'pds-app-header',
  styleUrls: ['app-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="page-headline body-small">
      <ng-container *ngIf="'title' | routeData | async as title">
        <span class="page-title uppercase">{{ title }}</span>
      </ng-container>
    </div>
    <div>
      <pds-toggle-box label="Dark Mode" [formControl]="darkModeControl"></pds-toggle-box>
    </div>
  `,
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  protected readonly ngDestroys = new Subject();

  readonly darkModeControl = new FormControl();

  constructor(
    readonly parent: PageHeader,
    @Inject(DOCUMENT) readonly document: Document,
    @Inject(WINDOW) protected window: Window
  ) {}

  setDarkMode(enabled: boolean): void {
    this.darkModeControl.setValue(enabled, { emitEvent: false });

    if (enabled) this.document.body.classList.add('dark');
    else this.document.body.classList.remove('dark');
  }

  ngOnInit() {
    this.darkModeControl.valueChanges
      .pipe(takeUntil(this.ngDestroys))
      .subscribe((enabled) => this.setDarkMode(enabled));

    const media = this.window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', ({ matches }) => this.setDarkMode(matches));
    this.setDarkMode(media.matches);
  }
  ngOnDestroy() {
    this.ngDestroys.next();
    this.ngDestroys.complete();
  }
}
