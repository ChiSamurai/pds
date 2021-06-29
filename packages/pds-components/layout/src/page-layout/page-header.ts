import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  InjectionToken,
  Input,
  Optional,
  Type,
  ViewEncapsulation
} from '@angular/core';
import { PDS_PAGE_ENCAPSULATION } from './page-encapsulation';

export const PDS_PAGE_HEADER_COMPONENT = new InjectionToken<Type<any>>('PDS_PAGE_HEADER_COMPONENT');

@Component({
  selector: 'pds-page-header',
  styleUrls: [ './page-header.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #ngContentTemplate>
      <ng-content></ng-content>
    </ng-template>
    <ng-template #defaultComponentOrContentTemplate>
      <ng-container *ngIf="!!component; else ngContentTemplate">
        <ng-template [templateOutlet]="ngContentTemplate" #ngContentOutlet="templateOutlet"></ng-template>
        <ng-container *ngComponentOutlet="component; content: [ ngContentOutlet.viewRef.rootNodes ]"></ng-container>
      </ng-container>
    </ng-template>

    <ng-container *encapsulate="encapsulation">
      <ng-container *templateOutlet="defaultComponentOrContentTemplate"></ng-container>
    </ng-container>
  `
})
export class PdsPageHeader {
  @Input() encapsulation: string;

  constructor(
    @Optional() @Inject(PDS_PAGE_ENCAPSULATION) encapsulation?: /* @dynamic */ string,
    @Optional() @Inject(PDS_PAGE_HEADER_COMPONENT) readonly component?: Type<any>
  ) {
    if (encapsulation) this.encapsulation = encapsulation;
  }
}
