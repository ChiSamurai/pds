import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[formStatusPendingDef]' })
export class FormStatusPendingDef {
  constructor(readonly template: TemplateRef<any>) {}
}
