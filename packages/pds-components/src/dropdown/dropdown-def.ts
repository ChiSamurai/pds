import { Directive } from '@angular/core';
import { DropdownDefBase } from '@vitagroup/cdk';

@Directive({
  exportAs: 'pdsDropdownDef',
  selector: '[pdsDropdownDef]',
  inputs: ['preferredPosition: pdsDropdownPreferredPosition'],
})
export class DropdownDef extends DropdownDefBase {}
