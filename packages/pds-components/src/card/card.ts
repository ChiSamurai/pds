import { Component, ContentChild, Input, ViewEncapsulation } from '@angular/core';
import { CardFooter, CardHeader } from './card-content';

@Component({
  selector: 'pds-card',
  styleUrls: [ './card.scss' ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngIf="header != null; else viewHeader">
      <ng-content select="card-header"></ng-content>
    </ng-container>
    <ng-template #viewHeader>
      <pds-card-header *ngIf="label != null">
        <label *ngIf="label != null;">{{ label }}</label>
      </pds-card-header>
    </ng-template>
    <ng-content></ng-content>
    <ng-content select="card-footer"></ng-content>`
})
export class Card {

  @ContentChild(CardHeader, { static: false })
  private _dynamicHeader: CardHeader | null;
  @ContentChild(CardHeader, { static: true })
  private _staticHeader: CardHeader | null;

  @ContentChild(CardFooter, { static: false })
  private _dynamicFooter: CardFooter | null;
  @ContentChild(CardFooter, { static: true })
  private _staticFooter: CardFooter | null;

  @Input() label: string;

  /** Gets the actively projected {@link CardHeader} instance. Any dynamic {@link ContentChild} is preferred over a static one */
  get header(): CardHeader | null {
    return this._dynamicHeader || this._staticHeader;
  }
  /** Gets the actively projected {@link CardFooter} instance. Any dynamic {@link ContentChild} is preferred over a static one */
  get footer(): CardHeader | null {
    return this._dynamicFooter || this._staticFooter;
  }

}
