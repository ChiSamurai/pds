import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckBoxBase } from '@vitagroup/cdk';

@Component({
  selector: 'pds-check-box',
  styleUrls: ['./check-box.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: PdsCheckBox, multi: true }],
  host: { '[attr.tabindex]': '0' },
  /* eslint-disable max-len */
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
    <div class="toggle-indicator">
      <!-- the intermediate state is currently handled using the css ":before" pseudo -->
      <svg viewBox="0 0 16 16">
        <line
          *ngIf="!checked && intermediate"
          class="intermediate-indicator"
          x1="4"
          y1="8"
          x2="12"
          y2="8"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke="currentColor"
        />
        <path
          *ngIf="checked"
          class="checked-indicator"
          d="M6.4,12.3L6.4,12.3c-0.3,0-0.5-0.1-0.7-0.3L2.3,8.6c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l2.7,2.7L12.3,4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L7.1,12C6.9,12.2,6.7,12.3,6.4,12.3z"
        />
      </svg>
    </div>
    <ng-container *ngIf="labelAlign === 'after'">
      <ng-container *ngTemplateOutlet="labelTemplate"></ng-container>
    </ng-container>
  `,
  /* eslint-enable max-len */
})
export class PdsCheckBox extends CheckBoxBase {
  @Input() label: string | null;
  @Input() labelAlign: 'before' | 'after' = 'after';
}

@NgModule({
  declarations: [PdsCheckBox],
  exports: [PdsCheckBox],
  imports: [CommonModule],
})
export class PdsCheckBoxModule {}
