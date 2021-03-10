import { Directive, TemplateRef } from '@angular/core';

@Directive()
export abstract class OverlayDefBase {
  constructor(public template: TemplateRef<any>) {}
}
