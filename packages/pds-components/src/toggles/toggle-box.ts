import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToggleBase } from '@vitagroup/cdk';

@Component({
  selector: 'pds-toggle-box',
  styleUrls: ['./toggle-box.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.tabindex]': '0' },
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: ToggleBox, multi: true }],
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
    <div class="toggle-indicator">
      <div class="toggle-knob"></div>
    </div>
    <ng-container *ngIf="labelAlign == 'after'">
      <ng-container *ngTemplateOutlet="labelTemplate"></ng-container>
    </ng-container>
  `,
})
export class ToggleBox extends ToggleBase {
  @Input() label?: string;
  @Input() labelAlign?: 'before' | 'after' = 'after';
}

@NgModule({
  declarations: [ToggleBox],
  exports: [ToggleBox],
  imports: [CommonModule],
})
export class ToggleBoxModule {}
