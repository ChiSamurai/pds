import { Directive, TemplateRef } from '@angular/core';

@Directive()
export abstract class BaseOverlayDef {
  constructor(readonly template: TemplateRef<any>) {}
}
