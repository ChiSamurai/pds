import { Directive } from '@angular/core';
import { INPUT_ACCESSOR, InputDropdownDefBase } from '@vitagroup/cdk';

@Directive({
  exportAs: 'pdsInputDropdownDef',
  selector: '[pdsInputDropdownDef]',
  providers: [{ provide: INPUT_ACCESSOR, useExisting: InputDropdownDef }],
})
export class InputDropdownDef extends InputDropdownDefBase {}
