import { Component, ContentChild, Input, ViewEncapsulation } from '@angular/core';
import { PdsCardContent, PdsCardFooter, PdsCardHeader } from './card-content';

@Component({
  selector: 'pds-card',
  styleUrls: ['./card.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngIf="!!header; else viewHeader">
      <ng-content select="pds-card-header"></ng-content>
    </ng-container>
    <ng-template #viewHeader>
      <pds-card-header *ngIf="!!label">
        <label>{{ label }}</label>
      </pds-card-header>
    </ng-template>
    <ng-content select="pds-card-content"></ng-content>
    <ng-content></ng-content>
    <ng-content select="pds-card-footer"></ng-content>
  `,
})
export class PdsCard {
  @ContentChild(PdsCardHeader, { static: false })
  private _dynamicHeader: PdsCardHeader | null;
  @ContentChild(PdsCardHeader, { static: true })
  private _staticHeader: PdsCardHeader | null;

  @ContentChild(PdsCardContent, { static: false })
  private _dynamicContent: PdsCardContent | null;
  @ContentChild(PdsCardContent, { static: true })
  private _staticContent: PdsCardContent | null;

  @ContentChild(PdsCardFooter, { static: false })
  private _dynamicFooter: PdsCardFooter | null;
  @ContentChild(PdsCardFooter, { static: true })
  private _staticFooter: PdsCardFooter | null;

  @Input() label: string;

  get header(): PdsCardHeader | null {
    return this._dynamicHeader || this._staticHeader;
  }
  get content(): PdsCardContent | null {
    return this._dynamicContent || this._staticContent;
  }
  get footer(): PdsCardFooter | null {
    return this._dynamicFooter || this._staticFooter;
  }
}
