import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, HostBinding, HostListener, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToggleBase } from './toggle-base';

@Component({
  selector: 'pds-check-box',
  styleUrls: ['./check-box.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: CheckBox, multi: true }],
  template: `
    <div class="toggle-indicator">
      <!-- the intermediate state is currently handled using the css ":before" pseudo -->
      <svg viewBox="0 0 16 16" *ngIf="checked">
        <path
          d="M6.4,12.3L6.4,12.3c-0.3,0-0.5-0.1-0.7-0.3L2.3,8.6c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l2.7,2.7L12.3,4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L7.1,12C6.9,12.2,6.7,12.3,6.4,12.3z"
        />
      </svg>
    </div>
    <ng-container *ngIf="label != null; else projectLabelContent">
      <label>{{ label }}</label>
    </ng-container>
    <ng-template #projectLabelContent>
      <ng-content select="label"></ng-content>
    </ng-template>
  `,
})
export class CheckBox extends ToggleBase {
  private _intermediate = false;

  @Input() label: string | null;
  @Input() labelAlign: 'left' | 'right' = 'right';

  @Input()
  @HostBinding('class.intermediate')
  set intermediate(value: boolean) {
    this._intermediate = coerceBooleanProperty(value);
  }
  get intermediate(): boolean {
    return this._intermediate;
  }

  @HostListener('click') toggle(): void {
    super.toggle();
  }
}
