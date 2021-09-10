import { Directive, Input, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToggleBase } from './toggle-base';

@Directive({
  exportAs: 'toggle',
  selector: '[toggle]',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: Toggle, multi: true }],
})
export class Toggle<T = unknown> extends ToggleBase<T> {
  @Input('toggle') value: T;
}

@NgModule({
  declarations: [Toggle],
  exports: [Toggle],
})
export class ToggleModule {}
