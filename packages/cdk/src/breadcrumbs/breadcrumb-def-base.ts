import { NgForOfContext } from '@angular/common';
import { Directive, Input, Predicate, TemplateRef } from '@angular/core';
import { BreadcrumbSiteRef } from '@vitagroup/common';

export class BreadcrumbDefContext extends NgForOfContext<BreadcrumbSiteRef> {}

@Directive()
export class BreadcrumbDefBase {
  @Input() when: Predicate<BreadcrumbSiteRef> | null;

  constructor(readonly template: TemplateRef<BreadcrumbDefContext>) {}

  static ngTemplateContextGuard(dir: BreadcrumbDefBase, ctx: unknown): ctx is BreadcrumbDefContext {
    return true;
  }
}
