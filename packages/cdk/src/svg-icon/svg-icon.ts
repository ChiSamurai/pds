import { Component, Inject, InjectionToken, Input, Optional, ViewEncapsulation } from '@angular/core';
import { SvgIconData, SvgIconRegistry } from './svg-icon-registry';

export interface SvgIconSizeAliases {
  [ key: string ]: string | number;
}

export const SVG_ICON_SIZE = new InjectionToken<string | number>('SVG_ICON_SIZE');
export const SVG_ICON_SIZE_ALIASES = new InjectionToken<SvgIconSizeAliases>('SVG_ICON_SIZE_ALIASES');

@Component({
  selector: 'svg-icon',
  styles: [
    'svg-icon { display: inline-flex; align-items: center; justify-content: center }',
    'svg-icon > svg { fill: currentColor; stroke: none }'
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg [attr.height]="sizeAsNumber" [attr.width]="sizeAsNumber" [attr.viewBox]="registered ? null : viewBox">
      <ng-container *ngIf="registered; else ngContentTemplate">
        <use [attr.xlink:href]="href"></use>
      </ng-container>
    </svg>
    <ng-template #ngContentTemplate>
      <ng-content></ng-content>
    </ng-template>`
})
export class SvgIcon {
  @Input() id: string;
  @Input() size: string | number = 18;

  /**
   * Gets or sets the fallback view box used when no reference symbol can be found
   * for the given {@link id}
   */
  @Input() viewBox: string;

  get href(): string {
    return this.id && `#${ this.id }`;
  }

  get data(): SvgIconData {
    return this.registry.resolve(this.id);
  }

  get sizeAsNumber(): number {
    const size = this.sizeAliases != null && typeof this.size === 'string'
      ? this.sizeAliases[ this.size ]
      : this.size;
    return typeof size === 'string'
      ? parseFloat(size)
      : size;
  }

  get registered(): boolean {
    return this.id && this.data != null;
  }

  constructor(
    protected registry: SvgIconRegistry,
    @Optional() @Inject(SVG_ICON_SIZE_ALIASES) protected readonly sizeAliases: /* @dynamic */ SvgIconSizeAliases,
    @Optional() @Inject(SVG_ICON_SIZE) size: /* @dynamic */ number | string
  ) {
    if (size != null) this.size = size;
  }
}
