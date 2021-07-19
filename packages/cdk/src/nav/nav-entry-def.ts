import { Directive, Input, Predicate, TemplateRef } from '@angular/core';
import { NavEntry } from './nav-entry';

export interface NavEntryDefContext extends Record<PropertyKey, any> {
  $implicit: NavEntry;
  secondary?: boolean;
}

@Directive({ selector: '[navEntryDef]' })
export class NavEntryDef {
  @Input('navEntryDefWhen') when: Predicate<NavEntry> | boolean;

  constructor(readonly template: TemplateRef<NavEntryDefContext>) {}

  static ngTemplateContextGuard(dir: NavEntryDef, ctx: unknown): ctx is NavEntryDefContext {
    return true;
  }
}
