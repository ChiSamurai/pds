import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ContentChildren, Directive, Input, QueryList, TemplateRef } from '@angular/core';
import { Breadcrumbs, SiteRef } from '@vitagroup/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreadcrumbDefBase, BreadcrumbDefContext } from './breadcrumb-def-base';

@Directive()
export class BreadcrumbsBase {
  private _skipEmptyRouteData = true;

  @ContentChildren(BreadcrumbDefBase, { descendants: true })
  protected readonly defs: QueryList<BreadcrumbDefBase>;

  readonly activeSitePath: Observable<SiteRef[]> = this.breadcrumbs.asObservable().pipe(
    map((sitePath) => {
      if (this._skipEmptyRouteData) return sitePath.filter((site) => site.route.data != null);
      else return sitePath;
    })
  );

  @Input()
  set skipEmptyRouteData(value: boolean) {
    this._skipEmptyRouteData = coerceBooleanProperty(value);
  }
  get skipEmptyRouteData(): boolean {
    return this._skipEmptyRouteData;
  }

  get defaultTemplate(): TemplateRef<BreadcrumbDefContext> | null {
    return this.defs?.find((def) => def.when == null)?.template;
  }

  constructor(protected breadcrumbs: Breadcrumbs) {}

  resolveTemplate(site: SiteRef): TemplateRef<BreadcrumbDefContext> | null {
    return this.defs?.find((def) => def.when?.(site))?.template || this.defaultTemplate;
  }
  resolveTemplateContext(site: SiteRef, index: number): BreadcrumbDefContext {
    const sites = this.breadcrumbs.snapshot;
    return new BreadcrumbDefContext(site, sites, index, sites?.length || 0);
  }
}
