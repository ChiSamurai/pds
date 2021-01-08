import { Component, ContentChild, Input, ViewEncapsulation } from '@angular/core';
import { CardContent, CardFooter, CardHeader } from './card-content';

@Component({
  selector: 'pds-card',
  styleUrls: ['./card.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngIf="header != null; else viewHeader">
      <ng-content select="pds-card-header"></ng-content>
    </ng-container>
    <ng-template #viewHeader>
      <pds-card-header *ngIf="label != null">
        <label *ngIf="label != null">{{ label }}</label>
      </pds-card-header>
    </ng-template>
    <ng-content select="pds-card-content"></ng-content>
    <ng-content></ng-content>
    <ng-content select="pds-card-footer"></ng-content>
  `,
})
export class Card {
  @ContentChild(CardHeader, { static: false })
  private _dynamicHeader: CardHeader | null;
  @ContentChild(CardHeader, { static: true })
  private _staticHeader: CardHeader | null;

  @ContentChild(CardContent, { static: false })
  private _dynamicContent: CardContent | null;
  @ContentChild(CardContent, { static: true })
  private _staticContent: CardContent | null;

  @ContentChild(CardFooter, { static: false })
  private _dynamicFooter: CardFooter | null;
  @ContentChild(CardFooter, { static: true })
  private _staticFooter: CardFooter | null;

  @Input() label: string;

  get header(): CardHeader | null {
    return this._dynamicHeader || this._staticHeader;
  }
  get content(): CardContent | null {
    return this._dynamicContent || this._staticContent;
  }
  get footer(): CardFooter | null {
    return this._dynamicFooter || this._staticFooter;
  }
}
