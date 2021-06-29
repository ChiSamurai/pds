import { Directive } from '@angular/core';
import { ComboDefBase } from '@vitagroup/cdk';

@Directive({
  selector: '[pdsComboDef]',
  providers: [{ provide: ComboDefBase, useExisting: PdsComboDef }],
  inputs: ['when: pdsComboDefWhen'],
})
export class PdsComboDef<T = any> extends ComboDefBase<T> {}
