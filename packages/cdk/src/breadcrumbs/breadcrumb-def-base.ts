import { NgForOfContext } from '@angular/common';
import { Directive, Input, Predicate, TemplateRef } from '@angular/core';
import { SiteRef } from '@vitagroup/common';

export class BreadcrumbDefContext extends NgForOfContext<SiteRef> {}

@Directive()
export class BreadcrumbDefBase {
  @Input() when: Predicate<SiteRef> | null;

  constructor(readonly template: TemplateRef<BreadcrumbDefContext>) {}

  static ngTemplateContextGuard(dir: BreadcrumbDefBase, ctx: unknown): ctx is BreadcrumbDefContext {
    return true;
  }
}
