import { ContentChildren, Directive, Input, OnDestroy, OnInit, QueryList, TemplateRef } from '@angular/core';
import { EventUnlistener } from '@vitagroup/common';
import { TextBoxBase } from '../text-box/text-box-base';
import { ComboDefBase, ComboDefContext } from './combo-def-base';

@Directive()
export abstract class ComboBoxBase<T> extends TextBoxBase<T[]> implements OnInit, OnDestroy {
  @ContentChildren(ComboDefBase, { descendants: true })
  protected readonly comboDefs: QueryList<ComboDefBase<T>>;

  protected unlistenKeyUp: EventUnlistener;

  @Input() inputValueParser: (str: string) => T = (str) => str as any;

  get defaultComboTemplate(): TemplateRef<ComboDefContext<T>> | null {
    return this.comboDefs?.find((def) => def.when == null)?.template;
  }

  protected onKeyUp(event: KeyboardEvent): void {
    const { value: inputValue } = this.inputRef.nativeElement;

    if (inputValue && event.key === 'Enter') {
      const value = this.inputValueParser(inputValue);
      this.value = this.value != null ? [...this.value, value] : [value];
      this.inputRef.nativeElement.value = null;
    } else if (!inputValue?.trim() && event.key === 'Backspace') {
      this.value = this.value.slice(0, this.value.length - 1);
    }
    this.changeDetectorRef.detectChanges();
  }

  resolveComboTemplate(value: T): TemplateRef<ComboDefContext<T>> | null {
    return this.comboDefs?.find((def) => def.when?.(value))?.template || this.defaultComboTemplate;
  }
  resolveComboContext(value: T, index: number): ComboDefContext<T> {
    const count = this.value?.length || 0;
    const first = index === 0;
    const last = index === count;

    return { $implicit: value, index, count, first, last };
  }

  ngOnInit() {
    super.ngOnInit();
    this.renderer.listen(this.inputRef.nativeElement, 'keyup', this.onKeyUp.bind(this));
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this.unlistenKeyUp?.();
  }
}
