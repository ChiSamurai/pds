import { Component, Inject, InjectionToken, Input, Optional, ViewEncapsulation } from '@angular/core';
import { SvgIconData, SvgIconRegistry } from './svg-icon-registry';

export interface SvgIconSizeAliases {
  [key: string]: string | number;
}

export const SVG_ICON_SIZE = new InjectionToken<string | number>('SVG_ICON_SIZE');
export const SVG_ICON_SIZE_ALIASES = new InjectionToken<SvgIconSizeAliases>('SVG_ICON_SIZE_ALIASES');

/** @internal */
const SVG_FALLBACK_SIZE = '1em';

@Component({
  selector: 'svg-icon',
  styles: [
    'svg-icon { display: inline-flex; align-items: center; justify-content: center; line-height: 1 }',
    'svg-icon > svg { fill: currentColor; stroke: none }',
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #ngContentTemplate>
      <ng-content></ng-content>
    </ng-template>
    <ng-template #ngContentTitle>
      <ng-content select="title"></ng-content>
    </ng-template>

    <svg
      [attr.height]="sizeAsNumber || '${SVG_FALLBACK_SIZE}'"
      [attr.width]="sizeAsNumber || '${SVG_FALLBACK_SIZE}'"
      [attr.viewBox]="registered ? null : viewBox"
    >
      <ng-container *ngIf="!!title; else ngContentTitle">
        <title>{{ title }}</title>
      </ng-container>

      <ng-container *ngIf="registered; else ngContentTemplate">
        <use [attr.href]="href"></use>
      </ng-container>
    </svg>
  `,
})
export class SvgIcon {
  /** @deprecated Use {@link name} instead */
  @Input() id: string;

  @Input() name: string;
  @Input() fallback: string;
  @Input() size: string | number;

  @Input() title: string;

  /**
   * Gets or sets the fallback view box used when no reference symbol can be found
   * for the given {@link id}
   */
  @Input() viewBox: string;

  get href(): string {
    return (this.name || this.fallback) && `#${this.name || this.fallback}`;
  }
  get data(): SvgIconData {
    return this.registry.resolve(this.name) || (this.fallback && this.registry.resolve(this.fallback));
  }
  get sizeAsNumber(): number {
    const size = this.sizeAliases != null && typeof this.size === 'string' ? this.sizeAliases[this.size] : this.size;
    return typeof size === 'string' ? parseFloat(size) : size;
  }
  get registered(): boolean {
    return (this.name || this.fallback) && this.data != null;
  }

  constructor(
    protected registry: SvgIconRegistry,
    @Optional() @Inject(SVG_ICON_SIZE_ALIASES) protected readonly sizeAliases: /* @dynamic */ SvgIconSizeAliases,
    @Optional() @Inject(SVG_ICON_SIZE) size: /* @dynamic */ number | string
  ) {
    if (size != null) this.size = size;
  }
}
