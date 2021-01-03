import { Directive, ElementRef, Input } from '@angular/core';

@Directive()
export abstract class SelectOptionBase<T, E = any> {
  @Input() disabled: boolean;
  @Input() value: T;

  get nativeElement(): E {
    return this.elementRef.nativeElement;
  }

  constructor(protected elementRef: ElementRef<E>) {}
}
