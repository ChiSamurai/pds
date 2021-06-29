import { Directive } from '@angular/core';
import { ComboDefBase, ComboDefContext } from '../combo-box/combo-def-base';

export type SelectDefContext<T> = ComboDefContext<T>;

@Directive()
export abstract class SelectDefBase<T, C extends SelectDefContext<T> = SelectDefContext<T>> extends ComboDefBase<T, C> {
  static ngTemplateContextGuard<T>(dir: ComboDefBase<T>, ctx: unknown): ctx is SelectDefContext<T> {
    return true;
  }
}
