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
          [attr.stroke-width]="strokeWidth"
          [attr.stroke-linecap]="strokeLineCap"
          stroke="currentColor"
        />
        <g *ngIf="checked" class="checked-indicator">
          <line
            x1="1"
            y1="8"
            x2="7"
            y2="13"
            [attr.stroke-width]="strokeWidth"
            [attr.stroke-linecap]="strokeLineCap"
            stroke="currentColor"
          />
          <line
            x1="7"
            y1="13"
            x2="15"
            y2="3"
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
  @Input() label: string | null;
  @Input() labelAlign: 'before' | 'after' = 'after';

  @Input() strokeLineCap: 'butt' | 'round' | 'square' = 'square';
  @Input() strokeWidth = 3;
}

@NgModule({
  declarations: [PdsCheckBox],
  exports: [PdsCheckBox],
  imports: [CommonModule],
})
export class PdsCheckBoxModule {}
