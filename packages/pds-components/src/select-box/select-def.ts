import { Directive } from '@angular/core';
import { SelectDefBase } from '@vitagroup/cdk';

@Directive({
  selector: '[pdsSelectDef]',
  providers: [{ provide: SelectDefBase, useExisting: PdsSelectDef }],
})
export class PdsSelectDef<T = any> extends SelectDefBase<T> {}
