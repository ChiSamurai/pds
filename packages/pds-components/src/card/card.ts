import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChild, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { ElementDisabledState, ElementFocusState } from '@vitagroup/cdk';
import { PdsCardContent, PdsCardFooter, PdsCardHeader } from './card-content';

@Component({
  selector: 'pds-card',
  styleUrls: ['./card.scss'],
  host: { '[attr.tabindex]': '0' },
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content select="pds-card-header"></ng-content>
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

  @Input('disabled') private set _disabled(value: boolean) {
    this.disabled.set(coerceBooleanProperty(value));
  }

  readonly disabled = new ElementDisabledState(this.elementRef, this.renderer);

  get header(): PdsCardHeader | null {
    return this._dynamicHeader || this._staticHeader;
  }
  get content(): PdsCardContent | null {
    return this._dynamicContent || this._staticContent;
  }
  get footer(): PdsCardFooter | null {
    return this._dynamicFooter || this._staticFooter;
  }

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {}
}
