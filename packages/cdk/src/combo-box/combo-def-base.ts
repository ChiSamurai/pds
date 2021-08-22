import { NgForOfContext } from '@angular/common';
import { Directive, Input, Predicate, TemplateRef } from '@angular/core';

export class ComboDefContext<T = any> extends NgForOfContext<T> {}

@Directive()
export class ComboDefBase<T, C extends ComboDefContext<T> = ComboDefContext<T>> {
  @Input() when: Predicate<T> | null;

  constructor(readonly template: TemplateRef<ComboDefContext<T>>) {}

  static ngTemplateContextGuard<T>(dir: ComboDefBase<T>, ctx: unknown): ctx is ComboDefContext<T> {
    return true;
  }
}
