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
        <a class="no-deco" *pdsBreadcrumbDef="let site" [routerLink]="site.linkUrl">
          {{ site.route.data?.guide?.title || site.route.data?.title }}
        </a>
      </pds-breadcrumbs>
    </ng-container>
    <div>
      <ng-content></ng-content>
    </div>
    <pds-toggle-box [formControl]="darkModeControl">
      <label [class.text-warning]="darkModeControl.value">
        <svg-icon size="24" [name]="darkModeControl.value ? 'sun' : 'moon'"></svg-icon>
      </label>
    </pds-toggle-box>
  `,
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  protected readonly ngDestroys = new Subject();

  readonly darkModeControl = new FormControl(this.app.darkMode);

  constructor(
    readonly parent: PdsPageHeader,
    protected changeDetector: ChangeDetectorRef,
    protected app: AppComponent
  ) {}

  ngOnInit() {
    this.darkModeControl.valueChanges.pipe(takeUntil(this.ngDestroys)).subscribe((enabled) => {
      this.app.darkMode = enabled;
      this.changeDetector.detectChanges();
    });
  }
  ngOnDestroy() {
    this.ngDestroys.next();
    this.ngDestroys.complete();
  }
}
