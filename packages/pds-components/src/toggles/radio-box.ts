import { Component, HostListener, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToggleBase, ToggleCheckOptions } from './toggle-base';

@Component({
  selector: 'pds-radio-box',
  styleUrls: [ './radio-box.scss' ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: RadioBox, multi: true }
  ],
  template: `
		<div class="toggle-indicator"></div>
		<ng-container *ngIf="label != null; else projectLabelContent">
			<label>{{ label }}</label>
		</ng-container>
		<ng-template #projectLabelContent>
			<ng-content select="label"></ng-content>
		</ng-template>`
})
export class RadioBox extends ToggleBase {
  @Input() label: string | null;

  @HostListener('click') check(option?: ToggleCheckOptions): void {
    super.check(option);
  }
}
