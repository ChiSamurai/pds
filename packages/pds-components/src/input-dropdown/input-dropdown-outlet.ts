import { OverlayConfig } from '@angular/cdk/overlay';
import { Directive } from '@angular/core';
import { InputDropdownOutletBase } from '@vitagroup/cdk';

@Directive({
  selector: '[pdsInputDropdown]',
  inputs: ['overlayDef: pdsInputDropdown'],
})
export class InputDropdownOutlet extends InputDropdownOutletBase {
  protected configureOverlay(): OverlayConfig {
    return super.configureOverlay({ panelClass: 'pds-dropdown-overlay-container' });
  }
}
