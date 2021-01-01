import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, HostBinding, Input } from '@angular/core';
import { ToggleBase } from './toggle-base';

export const CHECK_BOX_TEMPLATE = `
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
    <div class="toggle-indicator">
      <!-- the intermediate state is currently handled using the css ":before" pseudo -->
      <svg viewBox="0 0 16 16">
        <line *ngIf="!checked && intermediate" class="intermediate-indicator"
          x1="4" y1="8" x2="12" y2="8" stroke-width="2.5" stroke-linecap="round" stroke="currentColor"
        />
        <path *ngIf="checked" class="checked-indicator"
          d="M6.4,12.3L6.4,12.3c-0.3,0-0.5-0.1-0.7-0.3L2.3,8.6c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l2.7,2.7L12.3,4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L7.1,12C6.9,12.2,6.7,12.3,6.4,12.3z"
        />
      </svg>
    </div>
    <ng-container *ngIf="labelAlign == 'right'">
      <ng-container *ngTemplateOutlet="labelTemplate"></ng-container>
    </ng-container>
  `;

@Directive()
export abstract class CheckBoxBase extends ToggleBase {
  private _intermediate = false;

  protected readonly intermediateClass = 'intermediate';

  @Input() label: string | null;
  @Input() labelAlign: 'left' | 'right' = 'right';

  @Input()
  set intermediate(value: boolean) {
    this._intermediate = coerceBooleanProperty(value);
    if (value) this.renderer.addClass(this.elementRef.nativeElement, this.intermediateClass);
    else this.renderer.removeClass(this.elementRef.nativeElement, this.intermediateClass);
  }
  get intermediate(): boolean {
    return this._intermediate;
  }
}
