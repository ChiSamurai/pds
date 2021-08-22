import { ContentChildren, Directive, QueryList, TemplateRef } from '@angular/core';
import { Breadcrumbs, SiteRef } from '@vitagroup/common';
import { BreadcrumbDefBase, BreadcrumbDefContext } from './breadcrumb-def-base';

@Directive()
export class BreadcrumbsBase {
  @ContentChildren(BreadcrumbDefBase, { descendants: true })
  protected readonly defs: QueryList<BreadcrumbDefBase>;

  get defaultTemplate(): TemplateRef<BreadcrumbDefContext> | null {
    return this.defs?.find((def) => def.when == null)?.template;
  }

  constructor(readonly breadcrumbs: Breadcrumbs) {}

  resolveTemplate(site: SiteRef): TemplateRef<BreadcrumbDefContext> | null {
    return this.defs?.find((def) => def.when?.(site))?.template || this.defaultTemplate;
  }
  resolveTemplateContext(site: SiteRef, index: number): BreadcrumbDefContext {
    const sites = this.breadcrumbs.snapshot;
    return new BreadcrumbDefContext(site, sites, index, sites?.length || 0);
  }
}
