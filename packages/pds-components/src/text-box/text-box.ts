import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextBoxBase } from '@vitagroup/cdk';

@Component({
  selector: 'pds-text-box',
  styleUrls: ['text-box.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: TextBox, multi: true }],
  template: `
    <ng-content select="[pdsBefore]"></ng-content>
    <input
      type="text"
      [value]="value || ''"
      [placeholder]="placeholder || ''"
      [readOnly]="readOnly.isSet"
      [disabled]="disabled.isSet"
      #inputElement
    />
    <ng-content select="[pdsAfter]"></ng-content>
  `,
})
export class TextBox extends TextBoxBase<string> implements OnInit {
  @ViewChild('inputElement', { static: true }) protected readonly inputRef: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.listenUntilDestroyed(this.elementRef, 'click', () => this.inputRef.nativeElement.focus());
    this.listenUntilDestroyed(this.inputRef, 'input', () => this.setValue(this.inputRef.nativeElement?.value));
  }
}
