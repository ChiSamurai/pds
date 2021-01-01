import { ControlValueAccessor } from '@angular/forms';

export abstract class ControlValueAccessorBase<T = any> implements ControlValueAccessor {
  private _isDisabled: boolean = false;
  private _emitChange: (value: any) => void;
  private _emitTouch: () => void;

  abstract writeValue(obj: any): void;

  registerOnChange(fn: any): void {
    this._emitChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._emitTouch = fn;
  }

  protected changeControlValue(value: T): void {
    if (typeof this._emitChange === 'function') {
      this._emitChange(value);
    }
  }
  protected touchControl(): void {
    if (typeof this._emitTouch === 'function') {
      this._emitTouch();
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }
  getDisabledState(): boolean {
    return this._isDisabled;
  }
}
