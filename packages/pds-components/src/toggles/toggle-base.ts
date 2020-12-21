import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessorBase } from '@vitagroup/cdk/forms';

export interface ToggleCheckOptions {
  emitTouch?: boolean;
  emitChange?: boolean;
  emitEvent?: boolean;
  value?: any;
}

@Directive()
export abstract class ToggleBase<T = any> extends ControlValueAccessorBase<T> implements OnChanges {
  private _checked = false;

  @Input() value: T;

  @Input()
  @HostBinding('class.checked')
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

  writeValue(obj: any): void {
    if (coerceBooleanProperty(obj)) this.check({ value: obj });
    else this.uncheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes && this.checked) this.changeControlValue(this.value);
  }

  check(options?: ToggleCheckOptions): void {
    if (!this.checked && (this.value == null || options == null || options.value === this.value)) {
      this._checked = true;
      if (options == null || options.emitTouch) this.touchControl();
      if (options == null || options.emitEvent) this.checks.emit();
      if (options == null || options.emitChange) this.changeControlValue();
    }
  }
  uncheck(options?: ToggleCheckOptions): void {
    if (this.checked) {
      this._checked = false;
      if (options == null || options.emitTouch) this.touchControl();
      if (options == null || options.emitEvent) this.unchecks.emit();
      if (options == null || options.emitChange) this.changeControlValue();
    }
  }
  toggle(): void {
    if (this.checked) this.uncheck();
    else this.check();
    this.changes.emit(this.checked);
  }

  protected changeControlValue(value?: T): void {
    value = value || this.value;
    if (this.checked && value != null) super.changeControlValue(value);
    else if (this.checked && value == null) super.changeControlValue(true as any);
    else super.changeControlValue(false as any);
  }
}
