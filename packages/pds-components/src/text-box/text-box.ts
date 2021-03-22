import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  ControlInputAccessor,
  ElementFocusState,
  INPUT_ACCESSOR,
  resolveElementFocusState,
  TextBoxBase,
} from '@vitagroup/cdk';
import { PrimitiveBehaviorState } from '@vitagroup/common';

@Component({
  selector: 'pds-text-box',
  styleUrls: ['text-box.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: TextBox, multi: true },
    { provide: INPUT_ACCESSOR, useExisting: TextBox },
    { provide: ElementFocusState, useFactory: resolveElementFocusState, deps: [TextBox] },
  ],
  host: {
    '[attr.tabindex]': '-1',
  },
  template: `
    <ng-content select="[pdsBefore]"></ng-content>
    <input
      type="text"
      tabindex="0"
      [value]="value || ''"
      [placeholder]="placeholder || ''"
      [readOnly]="readOnly.isSet"
      [disabled]="disabled.isSet"
      (blur)="focus.canUnset($event.relatedTarget) && focus.unset()"
      (focus)="focus.set()"
      #inputElement
    />
    <ng-content select="[pdsAfter]"></ng-content>
  `,
})
export class TextBox extends TextBoxBase<string> implements ControlInputAccessor, OnInit {
  @ViewChild('inputElement', { static: true }) protected readonly inputRef: ElementRef<HTMLInputElement>;

  readonly input = new PrimitiveBehaviorState<string>();

  ngOnInit() {
    super.ngOnInit();

    this.listenUntilDestroyed(this.inputRef, 'input', () => {
      const value = this.inputRef.nativeElement?.value;

      this.input.patch(value);
      this.setValue(value);
    });
  }
}
