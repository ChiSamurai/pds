import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PdsPageHeader } from '@vitagroup/pds-components/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'pds-app-header',
  styleUrls: ['app-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="page-headline">
      <ng-container *ngIf="'title' | routeData | async as title">
        <span class="page-title">{{ title }}</span>
      </ng-container>
      <ng-content></ng-content>
    </div>
    <div>
      <pds-toggle-box label="Dark Mode" [formControl]="darkModeControl"></pds-toggle-box>
    </div>
  `,
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  protected readonly ngDestroys = new Subject();

  readonly darkModeControl = new FormControl(this.app.darkMode);

  constructor(readonly parent: PdsPageHeader, protected app: AppComponent) {}

  ngOnInit() {
    this.darkModeControl.valueChanges
      .pipe(takeUntil(this.ngDestroys))
      .subscribe((enabled) => (this.app.darkMode = enabled));
  }
  ngOnDestroy() {
    this.ngDestroys.next();
    this.ngDestroys.complete();
  }
}
