import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { PdsPageHeader } from '@vitagroup/pds-components/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'pds-app-header',
  styleUrls: ['app-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="'title' | routeData | async as title">
      <pds-breadcrumbs>
        <a class="no-deco" routerLink="/">
          <svg-icon name="home"></svg-icon>
        </a>
        <div>&raquo;</div>
      </pds-breadcrumbs>
    </ng-container>
    <div class="header-content">
      <ng-content></ng-content>
    </div>
    <div class="header-controls">
      <pds-toggle-box [formControl]="roundModeControl" [pdsTooltip]="roundingTooltip">
        <label class="text-gray-secondary">
          <svg-icon size="24" [name]="roundModeControl.value ? 'circle' : 'square-full'"></svg-icon>
        </label>
      </pds-toggle-box>
      <pds-tooltip preferredPosition="bottom" #roundingTooltip>
        <pds-banner class="xs">{{ roundModeControl.value ? 'Disable' : 'Enable' }}&nbsp;Rounding</pds-banner>
      </pds-tooltip>

      <pds-toggle-box [formControl]="lightModeControl" [pdsTooltip]="darkModeTooltip">
        <label [class.text-warning]="lightModeControl.value">
          <svg-icon size="24" [name]="lightModeControl.value ? 'sun' : 'moon'"></svg-icon>
        </label>
      </pds-toggle-box>
      <pds-tooltip preferredPosition="bottom" #darkModeTooltip>
        <pds-banner class="xs">{{ lightModeControl.value ? 'Enable' : 'Disable' }}&nbsp;Dark Mode</pds-banner>
      </pds-tooltip>
    </div>
  `,
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  protected readonly ngDestroys = new Subject();

  readonly lightModeControl = new FormControl(!this.app.darkMode);
  readonly roundModeControl = new FormControl(this.app.roundMode);

  constructor(
    readonly parent: PdsPageHeader,
    protected changeDetector: ChangeDetectorRef,
    protected app: AppComponent
  ) {}

  ngOnInit() {
    this.lightModeControl.valueChanges.pipe(takeUntil(this.ngDestroys)).subscribe((enabled) => {
      this.app.darkMode = !enabled;
      this.changeDetector.detectChanges();
    });
    this.roundModeControl.valueChanges.pipe(takeUntil(this.ngDestroys)).subscribe((enabled) => {
      this.app.roundMode = enabled;
      this.changeDetector.detectChanges();
    });
  }
  ngOnDestroy() {
    this.ngDestroys.next();
    this.ngDestroys.complete();
  }
}
