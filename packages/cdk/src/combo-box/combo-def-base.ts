import { Directive, Input, Predicate, TemplateRef } from '@angular/core';

export interface ComboDefContext<T = any> {
  $implicit: T;
  index: number;
  count: number;
  first: boolean;
  last: boolean;
}

@Directive()
export class ComboDefBase<T, C extends ComboDefContext<T> = ComboDefContext<T>> {
  @Input() when: Predicate<T> | null;

  constructor(readonly template: TemplateRef<ComboDefContext<T>>) {}
}
