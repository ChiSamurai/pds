import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckBoxBase } from '@vitagroup/cdk';
import { PdsToggleLabelAlign } from './toggle-label-align';

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
      <svg viewBox="0 0 18 18">
        <line
          *ngIf="!checked && intermediate"
          class="intermediate-indicator"
          x1="5"
          y1="9"
          x2="13"
          y2="9"
          [attr.stroke-width]="strokeWidth"
          [attr.stroke-linecap]="strokeLineCap"
          stroke="currentColor"
        />
        <g *ngIf="checked" class="checked-indicator">
          <line
            x1="2"
            y1="9"
            x2="8"
            y2="14"
            [attr.stroke-width]="strokeWidth"
            [attr.stroke-linecap]="strokeLineCap"
            stroke="currentColor"
          />
          <line
            x1="8"
            y1="14"
            x2="16"
            y2="4"
            [attr.stroke-width]="strokeWidth"
            [attr.stroke-linecap]="strokeLineCap"
            stroke="currentColor"
          />
        </g>
      </svg>
    </div>
    <ng-container *ngIf="labelAlign === 'after'">
      <ng-container *ngTemplateOutlet="labelTemplate"></ng-container>
    </ng-container>
  `,
  /* eslint-enable max-len */
})
export class PdsCheckBox extends CheckBoxBase {
  @Input() label: string;
  @Input() labelAlign: PdsToggleLabelAlign = 'after';

  @Input() strokeLineCap: 'round' | 'square' = 'round';
  @Input() strokeWidth = 3;
}

@NgModule({
  declarations: [PdsCheckBox],
  exports: [PdsCheckBox],
  imports: [CommonModule],
})
export class PdsCheckBoxModule {}
