import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-ring-loader',
  styleUrls: [ './ring-loader.scss' ],
  encapsulation: ViewEncapsulation.None,
  template: `
		<svg viewBox="0 0 50 50" [style.height]="size" [style.width.px]="size">
			<circle cx="25" cy="25" [attr.r]="radius" [attr.stroke-width]="width" />
		</svg>`
})
export class RingLoader {
  @Input() width: number = 5;
  @Input() size: string | number = 64;

  get radius(): number {
    return 25 - (this.width / 2);
  }
}
