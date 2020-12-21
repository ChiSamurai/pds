import { Component, HostListener, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToggleBase, ToggleCheckOptions } from './toggle-base';

@Component({
  selector: 'pds-radio-box',
  styleUrls: ['./radio-box.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: RadioBox, multi: true }],
  template: `
    <ng-template #labelTemplate>
      <ng-container *ngIf="label != null; else projectLabelContent">
        <label>{{ label }}</label>
      </ng-container>
      <ng-template #projectLabelContent>
        <ng-content select="label"></ng-content>
      </ng-template>
    </ng-template>

    <ng-container *ngIf="labelAlign == 'left'">
      <ng-container *ngTemplateOutlet="labelTemplate"></ng-container>
    </ng-container>
    <div class="toggle-indicator"></div>
    <ng-container *ngIf="labelAlign == 'right'">
      <ng-container *ngTemplateOutlet="labelTemplate"></ng-container>
    </ng-container>
  `,
})
export class RadioBox extends ToggleBase {
  @Input() label: string | null;
  @Input() labelAlign: 'left' | 'right' = 'right';

  @HostListener('click') check(option?: ToggleCheckOptions): void {
    super.check(option);
  }
}
