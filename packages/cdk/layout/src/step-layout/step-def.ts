import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { Directive, Input, TemplateRef } from '@angular/core';

/** @deprecated Use {@link StepModel} instead */
@Directive({ selector: '[stepDef]' })
export class StepDef {
  private _ignoreInvalid = false;
  private _order: number;

  @Input('stepDef') condition: boolean;

  @Input('stepDefOrder')
  set order(value: number) {
    this._order = coerceNumberProperty(value);
  }
  get order(): number {
    return this._order;
  }

  @Input('stepDefIgnoreInvalid')
  set ignoreInvalid(value: boolean) {
    this._ignoreInvalid = coerceBooleanProperty(value);
  }
  get ignoreInvalid(): boolean {
    return this._ignoreInvalid;
  }

  get canContinue(): boolean {
    return this.ignoreInvalid || this.condition;
  }

  constructor(readonly template: TemplateRef<any>) {}
}
