import { Directive, Input } from '@angular/core';
import { ToggleBase } from './toggle-base';

export const RADIO_BOX_TEMPLATE = `
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
  `;

@Directive()
export class RadioBoxBase extends ToggleBase {
  @Input() label: string | null;
  @Input() labelAlign: 'left' | 'right' = 'right';
}
