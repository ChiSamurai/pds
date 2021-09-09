import { Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { PdsTooltipDef } from './tooltip-def';

@Component({
  selector: 'pds-tooltip',
  styleUrls: ['tooltip-overlay.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: ['preferredPosition'],
  template: `
    <ng-template #templateRef>
      <ng-content></ng-content>
    </ng-template>
  `,
})
export class PdsTooltip extends PdsTooltipDef {
  @ViewChild('templateRef') template: TemplateRef<any>;

  constructor() {
    super(null);
  }
}
