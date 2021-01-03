import { Directive } from '@angular/core';
import { ComboDefBase } from '@vitagroup/cdk';

@Directive({
  selector: '[pdsComboDef]',
  providers: [{ provide: ComboDefBase, useExisting: ComboDef }],
  inputs: ['when: pdsComboDefWhen'],
})
export class ComboDef<T = any> extends ComboDefBase<T> {}
