import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ContentChildren, Directive, Input, QueryList, TemplateRef } from '@angular/core';
import { Breadcrumbs, BreadcrumbSiteRef, SiteRef } from '@vitagroup/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreadcrumbDefBase, BreadcrumbDefContext } from './breadcrumb-def-base';

@Directive()
export abstract class BreadcrumbsBase {
  private _skipEmpty = true;

  @ContentChildren(BreadcrumbDefBase, { descendants: true })
  protected readonly defs: QueryList<BreadcrumbDefBase>;

  readonly activeSitePath: Observable<BreadcrumbSiteRef[]> = this.breadcrumbs.asObservable().pipe(
    map((sitePath) => {
      const startIndex = !this.startAt ? 0 : sitePath.findIndex((site) => site.linkUrl === this.startAt);
      const stopIndex = !this.stopAt ? sitePath.length : sitePath.findIndex((site) => site.linkUrl === this.stopAt);
      return sitePath
        .filter((site, index) => index >= startIndex && index <= stopIndex)
        .filter((site) => !this._skipEmpty || site.title?.trim());
    })
  );

  /** Gets or sets the {@link SiteRef.linkUrl} to start iterating the {@link activeSitePath} at */
  @Input() startAt: string;
  /** Gets or sets the {@link SiteRef.linkUrl} to stop iterating the {@link activeSitePath} at */
  @Input() stopAt: string;

  @Input()
  set skipEmpty(value: boolean) {
    this._skipEmpty = coerceBooleanProperty(value);
  }
  get skipEmpty(): boolean {
    return this._skipEmpty;
  }

  get defaultTemplate(): TemplateRef<BreadcrumbDefContext> | null {
    return this.defs?.find((def) => def.when == null)?.template;
  }

  constructor(protected breadcrumbs: Breadcrumbs) {}

  resolveTemplate(site: BreadcrumbSiteRef): TemplateRef<BreadcrumbDefContext> | null {
    return this.defs?.find((def) => def.when?.(site))?.template || this.defaultTemplate;
  }
  resolveTemplateContext(site: BreadcrumbSiteRef, index: number): BreadcrumbDefContext {
    const sites = this.breadcrumbs.snapshot;
    return new BreadcrumbDefContext(site, sites, index, sites?.length || 0);
  }
}
