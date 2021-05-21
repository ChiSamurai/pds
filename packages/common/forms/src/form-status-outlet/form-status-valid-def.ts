import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[formStatusValidDef]' })
export class FormStatusValidDef {
  constructor(readonly template: TemplateRef<any>) {}
}
