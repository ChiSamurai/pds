import { Directive } from '@angular/core';
import { INPUT_ACCESSOR, InputDropdownDefBase } from '@vitagroup/cdk';

@Directive({
  exportAs: 'pdsInputDropdownDef',
  selector: '[pdsInputDropdownDef]',
  providers: [{ provide: INPUT_ACCESSOR, useExisting: PdsInputDropdownDef }],
})
export class PdsInputDropdownDef extends InputDropdownDefBase {}
