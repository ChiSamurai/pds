import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { ElementDisabledState } from '@vitagroup/cdk';

@Component({
  selector: 'pds-tab',
  styleUrls: ['tab.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { '[attr.tabindex]': 'disabled.isUnset ? 0 : -1' },
  template: `
    <ng-content></ng-content>
  `,
})
export class PdsTab {
  @Input('disabled')
  private set _disabled(value: boolean) {
    this.disabled.set(coerceBooleanProperty(value));
  }

  readonly disabled = new ElementDisabledState(this.elementRef, this.renderer);

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {}
}
