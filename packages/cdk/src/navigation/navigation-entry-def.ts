import { Directive, Input, Predicate, TemplateRef } from '@angular/core';
import { NavigationEntry } from './navigation-entry';

export interface NavigationEntryDefContext extends Record<PropertyKey, any> {
  $implicit: NavigationEntry;
  static?: boolean;
}

@Directive({ selector: '[navEntryDef]' })
export class NavigationEntryDef {
  @Input('navEntryDefWhen') when: Predicate<NavigationEntry> | boolean;

  constructor(readonly template: TemplateRef<NavigationEntryDefContext>) {}
}
