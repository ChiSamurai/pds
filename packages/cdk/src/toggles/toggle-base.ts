import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { EventUnlistener } from '@vitagroup/common';
import { ElementActiveState, ElementDisabledState, ElementFocusState, ElementReadOnlyState } from '../element-state';
import { ControlValueAccessorBase } from '../utils';

export interface ToggleCheckOptions {
  emitTouch?: boolean;
  emitChange?: boolean;
  emitEvent?: boolean;
  value?: any;
}

@Directive()
export abstract class ToggleBase<T = any> extends ControlValueAccessorBase<T> implements OnChanges, OnInit, OnDestroy {
  private _checked = false;

  protected unlistenClick: EventUnlistener | null;

  readonly active = new ElementActiveState(this.elementRef, this.renderer);
  readonly focused = new ElementFocusState(this.elementRef, this.renderer);
  readonly readOnly = new ElementReadOnlyState(this.elementRef, this.renderer);
  readonly disabled = new ElementDisabledState(this.elementRef, this.renderer);

  @Input() value: T;

  @Input()
  set checked(value: boolean) {
    if (coerceBooleanProperty(value)) this.check();
    else this.uncheck();
  }
  get checked(): boolean {
    return this._checked;
  }

  @Output() readonly checks = new EventEmitter();
  @Output() readonly unchecks = new EventEmitter();

  @Output() readonly changes = new EventEmitter<boolean>();

  constructor(
    protected elementRef: ElementRef,
    protected changeDetectorRef: ChangeDetectorRef,
    protected renderer: Renderer2
  ) {
    super();
  }

  protected changeControlValue(value?: T): void {
    value = value || this.value;
    if (this.checked && value != null) super.changeControlValue(value);
    else if (this.checked && value == null) super.changeControlValue(true as any);
    else super.changeControlValue(false as any);
  }

  writeValue(obj: any): void {
    if (coerceBooleanProperty(obj)) this.check({ value: obj });
    else this.uncheck();
  }

  check(options?: ToggleCheckOptions): void {
    if (options != null && 'value' in options) this.value = options.value;
    if (!this.checked && (this.value == null || options == null || options.value === this.value)) {
      this.renderer.addClass(this.elementRef.nativeElement, 'checked');
      this._checked = true;
      if (options == null || options.emitTouch) this.touchControl();
      if (options == null || options.emitEvent) this.checks.emit();
      if (options == null || options.emitChange) this.changeControlValue();
    }
    this.changeDetectorRef.detectChanges();
  }
  uncheck(options?: ToggleCheckOptions): void {
    if (this.checked) {
      this.renderer.removeClass(this.elementRef.nativeElement, 'checked');
      this._checked = false;
      if (options == null || options.emitTouch) this.touchControl();
      if (options == null || options.emitEvent) this.unchecks.emit();
      if (options == null || options.emitChange) this.changeControlValue();
    }
    this.changeDetectorRef.detectChanges();
  }
  toggle(): void {
    this.checked = !this.checked;
    this.changes.emit(this.checked);
  }

  ngOnInit() {
    this.unlistenClick = this.renderer.listen(this.elementRef.nativeElement, 'click', () => this.toggle());
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes && this.checked) this.changeControlValue(this.value);
  }
  ngOnDestroy() {
    this.unlistenClick?.();
  }
}
