import { Directive } from '@angular/core';
import { BreadcrumbDefBase } from '@vitagroup/cdk';

@Directive({
  selector: '[pdsBreadcrumbDef]',
  inputs: ['when: pdsBreadcrumbDefWhen'],
  providers: [{ provide: BreadcrumbDefBase, useExisting: PdsBreadcrumbDef }],
})
export class PdsBreadcrumbDef extends BreadcrumbDefBase {}
