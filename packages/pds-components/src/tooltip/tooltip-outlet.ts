import { Directive } from '@angular/core';
import { TooltipOutletBase } from '@vitagroup/cdk';

@Directive({
  selector: '[pdsTooltip]',
  inputs: [
    'overlayDef: pdsTooltip',
    'preferredPosition: pdsTooltipPreferredPosition',
    'deactivateOnBlur: pdsTooltipDeactivateOnBlur',
  ],
})
export class PdsTooltipOutlet extends TooltipOutletBase {
  protected configureOverlay() {
    return super.configureOverlay({ panelClass: 'pds-tooltip-overlay-container' });
  }
}
