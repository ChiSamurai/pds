import { OverlayConfig } from '@angular/cdk/overlay';
import { Directive, OnInit } from '@angular/core';
import { DropdownOutletBase } from '@vitagroup/cdk';

@Directive({
  selector: '[pdsDropdown]',
  inputs: ['overlayDef: pdsDropdown'],
})
export class PdsDropdownOutlet extends DropdownOutletBase {
  protected configureOverlay(): OverlayConfig {
    return super.configureOverlay({ panelClass: 'pds-dropdown-overlay-container' });
  }
}
