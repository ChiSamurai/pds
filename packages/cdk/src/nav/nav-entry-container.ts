import { ContentChildren, Directive, OnDestroy, QueryList, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { NavEntry } from './nav-entry';
import { NavEntryDef, NavigationEntryDefContext } from './nav-entry-def';

@Directive()
export abstract class NavEntryContainer implements OnDestroy {
  protected readonly ngDestroys = new Subject<void>();

  @ContentChildren(NavEntryDef, { descendants: true })
  protected readonly contentEntryDefs: QueryList<NavEntryDef>;

  get defaultEntryTemplate(): TemplateRef<NavigationEntryDefContext> | null {
    return this.contentEntryDefs?.find((entryDef) => entryDef.when == null)?.template;
  }

  resolveEntryTemplate(entry: NavEntry): TemplateRef<NavigationEntryDefContext> | null {
    return (
      this.contentEntryDefs?.find((entryDef) => {
        return typeof entryDef.when === 'function' ? entryDef.when(entry) : entryDef.when;
      })?.template || this.defaultEntryTemplate
    );
  }

  ngOnDestroy() {
    this.ngDestroys.next();
    this.ngDestroys.complete();
  }
}
