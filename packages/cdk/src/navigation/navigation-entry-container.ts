import { ContentChildren, Directive, OnDestroy, QueryList, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { NavigationEntry } from './navigation-entry';
import { NavigationEntryDef, NavigationEntryDefContext } from './navigation-entry-def';

@Directive()
export abstract class NavigationEntryContainer implements OnDestroy {
  protected readonly ngDestroys = new Subject<void>();

  @ContentChildren(NavigationEntryDef, { descendants: true })
  protected readonly contentEntryDefs: QueryList<NavigationEntryDef>;

  get defaultEntryTemplate(): TemplateRef<NavigationEntryDefContext> | null {
    return this.contentEntryDefs?.find((entryDef) => entryDef.when == null)?.template;
  }

  resolveEntryTemplate(entry: NavigationEntry): TemplateRef<NavigationEntryDefContext> | null {
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
