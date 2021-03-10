import { OverlayConfig } from '@angular/cdk/overlay';
import { Directive } from '@angular/core';
import { DropdownOutletBase } from '@vitagroup/cdk';

@Directive({
  selector: '[pdsDropdownOutlet]',
  inputs: ['overlayDef: pdsDropdownOutlet'],
})
export class DropdownOutlet extends DropdownOutletBase {
  protected configureOverlay(): OverlayConfig {
    return new OverlayConfig({ panelClass: 'pds-dropdown-overlay-container' });
  }
}
