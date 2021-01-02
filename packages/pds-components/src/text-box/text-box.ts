import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TextBoxBase } from '@vitagroup/cdk';
import { EventUnlistener } from '@vitagroup/common';

@Component({
  selector: 'pds-text-box',
  styleUrls: ['text-box.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content select="[textPrefix]"></ng-content>
    <input
      type="text"
      [value]="value || ''"
      [placeholder]="placeholder || ''"
      [readOnly]="readOnly.isSet"
      [disabled]="disabled.isSet"
      #inputElement
    />
    <ng-content select="[textSuffix]"></ng-content>
  `,
})
export class TextBox extends TextBoxBase<string> implements OnInit, OnDestroy {
  @ViewChild('inputElement', { static: true }) protected readonly inputRef: ElementRef<HTMLInputElement>;

  protected unlistenInput: EventUnlistener | null;

  ngOnInit() {
    super.ngOnInit();
    this.unlistenInput = this.renderer.listen(this.inputRef.nativeElement, 'input', () => {
      this.setValue(this.inputRef.nativeElement?.value);
    });
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this.unlistenInput?.();
  }
}
