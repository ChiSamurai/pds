import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input } from '@angular/core';
import { ToggleBase } from './toggle-base';

@Directive()
export abstract class CheckBoxBase extends ToggleBase {
  private _intermediate = false;

  protected readonly intermediateClass = 'intermediate';

  @Input()
  set intermediate(value: boolean) {
    this._intermediate = coerceBooleanProperty(value);
    if (value) this.renderer.addClass(this.elementRef.nativeElement, this.intermediateClass);
    else this.renderer.removeClass(this.elementRef.nativeElement, this.intermediateClass);
  }
  get intermediate(): boolean {
    return this._intermediate;
  }
}
