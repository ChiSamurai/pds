import { Component, ContentChild, ViewEncapsulation } from '@angular/core';
import { BreadcrumbsBase } from '@vitagroup/cdk';
import { PdsBreadcrumbDivider } from './breadcrumb-divider';

@Component({
  selector: 'pds-breadcrumbs',
  styleUrls: ['breadcrumbs.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #defaultDividerTemplate>
      <div pdsBreadcrumbDivider>&raquo;</div>
    </ng-template>
    <ng-template #defaultBreadcrumbTemplate let-breadcrumb>
      <a class="no-deco" [routerLink]="breadcrumb.linkUrl">{{ breadcrumb.title | titlecase }}</a>
    </ng-template>

    <ng-content></ng-content>
    <ng-container *ngFor="let breadcrumb of activeSitePath | async; let i = index; let last = last">
      <ng-container
        *ngTemplateOutlet="
          resolveTemplate(breadcrumb) || defaultBreadcrumbTemplate;
          context: resolveTemplateContext(breadcrumb, i)
        "
      ></ng-container>
      <ng-container *ngIf="!last">
        <ng-container *ngIf="!!contentDivider; else defaultDividerTemplate">
          <ng-content select="[pdsBreadcrumbDivider]"></ng-content>
        </ng-container>
      </ng-container>
    </ng-container>
  `,
})
export class PdsBreadcrumbs extends BreadcrumbsBase {
  @ContentChild(PdsBreadcrumbDivider) readonly contentDivider: PdsBreadcrumbDivider;
}
