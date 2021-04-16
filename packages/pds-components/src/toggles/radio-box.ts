import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioBoxBase } from '@vitagroup/cdk';

@Component({
  selector: 'pds-radio-box',
  styleUrls: ['./radio-box.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.tabindex]': '0' },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: RadioBox, multi: true },
    { provide: RadioBoxBase, useExisting: RadioBox },
  ],
  template: `
    <ng-template #labelTemplate>
      <ng-container *ngIf="label != null; else projectLabelContent">
        <label>{{ label }}</label>
      </ng-container>
      <ng-template #projectLabelContent>
        <ng-content select="label"></ng-content>
      </ng-template>
    </ng-template>

    <ng-container *ngIf="labelAlign == 'before'">
      <ng-container *ngTemplateOutlet="labelTemplate"></ng-container>
    </ng-container>
    <div class="toggle-indicator"></div>
    <ng-container *ngIf="labelAlign == 'after'">
      <ng-container *ngTemplateOutlet="labelTemplate"></ng-container>
    </ng-container>
  `,
})
export class RadioBox extends RadioBoxBase {
  @Input() label: string | null;
  @Input() labelAlign: 'before' | 'after' = 'after';
}
