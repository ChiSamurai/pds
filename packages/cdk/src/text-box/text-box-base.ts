import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { EventUnlistener } from '@vitagroup/common';
import { ElementActiveState, ElementDisabledState, ElementFocusState, ElementReadOnlyState } from '../element-state';
import { ControlValueAccessorBase } from '../utils';

@Directive()
export abstract class TextBoxBase<T = any> extends ControlValueAccessorBase<T> implements OnInit, OnDestroy {
  protected abstract readonly inputRef: ElementRef<HTMLInputElement>;

  protected unlistenClick: EventUnlistener | null;

  private _value: T;

  readonly active = new ElementActiveState(this.elementRef, this.renderer);
  readonly focus = new ElementFocusState(this.elementRef, this.renderer);
  readonly readOnly = new ElementReadOnlyState(this.elementRef, this.renderer);
  readonly disabled = new ElementDisabledState(this.elementRef, this.renderer);

  @Input() placeholder?: string;

  @Input()
  set value(value: T) {
    this.setValue(value);
  }
  get value(): T {
    return this._value;
  }

  @Output() readonly valueChange = new EventEmitter<T>();

  constructor(
    protected elementRef: ElementRef,
    protected changeDetectorRef: ChangeDetectorRef,
    protected renderer: Renderer2
  ) {
    super();
  }

  protected setValue(value: T): void {
    this.changeControlValue(value);
    this._value = value;
  }

  protected onClick(event: Event): void {
    this.inputRef?.nativeElement?.focus?.();
  }

  writeValue(obj: any) {
    this._value = obj;
    this.valueChange.emit(this._value);
  }

  ngOnInit() {
    this.unlistenClick = this.renderer.listen(this.elementRef.nativeElement, 'click', this.onClick.bind(this));
  }
  ngOnDestroy() {
    this.unlistenClick();
  }
}
