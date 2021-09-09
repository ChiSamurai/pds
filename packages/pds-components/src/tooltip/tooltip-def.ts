import { Directive } from '@angular/core';
import { TooltipDefBase } from '@vitagroup/cdk';

@Directive({
  exportAs: 'pdsTooltipDef',
  selector: '[pdsTooltipDef]',
  inputs: ['preferredPosition'],
})
export class PdsTooltipDef extends TooltipDefBase {}
