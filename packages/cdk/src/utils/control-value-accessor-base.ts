import { ControlValueAccessor } from '@angular/forms';

export abstract class ControlValueAccessorBase<T = any> implements ControlValueAccessor {
  private _emitChange: Array<(value: any) => void> = [];
  private _emitTouch: Array<() => void> = [];
  private _isDisabled = false;
  private _controlValue: T;

  abstract writeValue(obj: any): void;

  registerOnChange(fn: any): void {
    this._emitChange.push(fn);
  }
  registerOnTouched(fn: any): void {
    this._emitTouch.push(fn);
  }

  protected changeControlValue(value: T): void {
    for (const emit of this._emitChange) emit(value);
    this._controlValue = value;
  }
  protected touchControl(): void {
    for (const emit of this._emitTouch) emit();
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }
  getDisabledState(): boolean {
    return this._isDisabled;
  }

  getValue(): T {
    return this._controlValue;
  }
}
