import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioBoxBase } from '@vitagroup/cdk';
import { PdsToggleLabelAlign } from './toggle-label-align';

@Component({
  selector: 'pds-radio-box',
  styleUrls: ['./radio-box.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.tabindex]': '0' },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: PdsRadioBox, multi: true },
    { provide: RadioBoxBase, useExisting: PdsRadioBox },
  ],
  template: `
    <ng-template #labelTemplate>
      <ng-container *ngIf="!!label; else projectLabelContent">
        <label>{{ label }}</label>
      </ng-container>
      <ng-template #projectLabelContent>
        <ng-content select="label"></ng-content>
      </ng-template>
    </ng-template>

    <ng-container *ngIf="labelAlign === 'before'">
      <ng-container *ngTemplateOutlet="labelTemplate"></ng-container>
    </ng-container>
    <div class="toggle-indicator"></div>
    <ng-container *ngIf="labelAlign === 'after'">
      <ng-container *ngTemplateOutlet="labelTemplate"></ng-container>
    </ng-container>
  `,
})
export class PdsRadioBox extends RadioBoxBase {
  @Input() label: string | null;
  @Input() labelAlign: PdsToggleLabelAlign = 'after';
}
