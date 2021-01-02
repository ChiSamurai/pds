import { Directive } from '@angular/core';
import { ComboDefBase } from '@vitagroup/cdk';

@Directive({
  selector: '[pdsComboDef]',
  providers: [{ provide: ComboDefBase, useExisting: ComboDef }],
})
export class ComboDef extends ComboDefBase {}
