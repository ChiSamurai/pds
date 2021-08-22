import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, HostBinding, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { PdsSpacingKey } from '../utils';

@Component({
  selector: 'pds-divider',
  styleUrls: ['./divider.scss'],
  encapsulation: ViewEncapsulation.None,
  template: ``,
})
export class PdsDivider {
  private _vertical = false;

  @Input() space: PdsSpacingKey = 'sm';

  @Input()
  @HostBinding('class.vertical')
  set vertical(value: boolean) {
    this._vertical = coerceBooleanProperty(value);
  }
  get vertical(): boolean {
    return this._vertical;
  }

  @HostBinding('style.--divider-spacing')
  protected get cssSpacingVar() {
    return `var(--space-${this.space})`;
  }
}

@NgModule({
  declarations: [PdsDivider],
  exports: [PdsDivider],
})
export class PdsDividerModule {}
