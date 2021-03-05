import { Directive, Input, Predicate, TemplateRef } from '@angular/core';
import { NavEntry } from './nav-entry';

export interface NavigationEntryDefContext extends Record<PropertyKey, any> {
  $implicit: NavEntry;
  static?: boolean;
}

@Directive({ selector: '[navEntryDef]' })
export class NavEntryDef {
  @Input('navEntryDefWhen') when: Predicate<NavEntry> | boolean;

  constructor(readonly template: TemplateRef<NavigationEntryDefContext>) {}
}
