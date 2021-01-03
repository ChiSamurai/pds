import { Directive } from '@angular/core';
import { SelectDefBase } from '@vitagroup/cdk';

@Directive({
  selector: '[pdsSelectDef]',
  providers: [{ provide: SelectDefBase, useExisting: SelectDef }],
})
export class SelectDef<T = any> extends SelectDefBase<T> {}
