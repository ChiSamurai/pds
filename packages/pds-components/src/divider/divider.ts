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

  /** Gets or sets the space used for the divider element */
  @Input() space: PdsSpacingKey = 'sm';

  /**
   * Gets or sets the size used for the divider element. Horizontal instances will use this value as their respective
   * {@link width} while vertically typed dividers will consider it as their {@link height}
   */
  @Input() size: string;

  /**
   * Gets or sets a flag indicating whether this element is visualized vertically or horizontally. Changes to this value
   * do have an impact on the interpretation of the {@link size} property value
   */
  @Input()
  @HostBinding('class.vertical')
  set vertical(value: boolean) {
    this._vertical = coerceBooleanProperty(value);
  }
  get vertical(): boolean {
    return this._vertical;
  }

  @HostBinding('style.width')
  get width(): string {
    return this.vertical ? null : this.size;
  }

  @HostBinding('style.height')
  get height(): string {
    return this.vertical ? this.size : null;
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
