import { Directive } from '@angular/core';
import { DropdownDefBase, ElementFocusState, resolveElementFocusState } from '@vitagroup/cdk';

@Directive({
  exportAs: 'pdsDropdownDef',
  selector: '[pdsDropdownDef]',
  inputs: ['preferredPosition: pdsDropdownPreferredPosition'],
  providers: [{ provide: ElementFocusState, useFactory: resolveElementFocusState, deps: [PdsDropdownDef] }],
})
export class PdsDropdownDef extends DropdownDefBase {}
