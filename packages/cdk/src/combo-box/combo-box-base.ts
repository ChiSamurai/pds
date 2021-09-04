import { coerceArray } from '@angular/cdk/coercion';
import { ContentChildren, Directive, QueryList, TemplateRef } from '@angular/core';
import { ShortcutManager } from '@vitagroup/common';
import { TextBoxBase } from '../text-box/text-box-base';
import { ComboDefBase, ComboDefContext } from './combo-def-base';

@Directive()
export abstract class ComboBoxBase<T, C extends ComboDefContext<T> = ComboDefContext<T>> extends TextBoxBase<T[]> {
  @ContentChildren(ComboDefBase, { descendants: true })
  protected readonly defs: QueryList<ComboDefBase<T, C>>;

  readonly shortcuts = new ShortcutManager(this.renderer, this.elementRef);

  get defaultTemplate(): TemplateRef<C> | null {
    return this.defs?.find((def) => def.when == null)?.template as TemplateRef<C>;
  }

  writeValue(obj: unknown) {
    super.writeValue(coerceArray(obj));
  }

  push(value: T): T[] {
    this.value = this.value != null ? [...this.value, value] : [value];
    this.changeDetectorRef.detectChanges();
    return this.value;
  }
  pop(): T | null {
    const value = this.value?.[this.value?.length - 1];
    this.value = this.value?.slice(0, this.value?.length - 1);
    this.changeDetectorRef.detectChanges();
    return value;
  }

  removeAt(index: number): T | null {
    const value = this.value?.[index];
    this.value = [...this.value.slice(0, index > 0 ? index - 1 : 0), ...this.value.slice(index + 1)];
    this.changeDetectorRef.detectChanges();
    return value;
  }

  resolveTemplate(value: T): TemplateRef<ComboDefContext<T>> | null {
    return this.defs?.find((def) => def.when?.(value))?.template || this.defaultTemplate;
  }
  resolveTemplateContext(value: T, index: number): ComboDefContext<T> {
    return new ComboDefContext<T>(value, this.value, index, this.value?.length || 0);
  }
}
