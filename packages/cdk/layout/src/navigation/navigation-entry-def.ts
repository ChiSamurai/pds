import { Directive, Input, Predicate, TemplateRef } from '@angular/core';
import { NavigationEntry } from './navigation-entry';

export interface NavigationEntryDefContext {
  $implicit: NavigationEntry;
}

@Directive({ selector: '[navEntryDef]' })
export class NavigationEntryDef {
  @Input('navEntryDefWhen') when: Predicate<NavigationEntry>;

  constructor(readonly template: TemplateRef<NavigationEntryDefContext>) {
  }
}
