import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  TrackByFunction,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ComboBoxBase } from '@vitagroup/cdk';

@Component({
  selector: 'pds-combo-box',
  styleUrls: ['combo-box.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #fallbackTemplate let-value let-last="last">
      <span>{{ value }}{{ !last ? ', ' : '' }}</span>
    </ng-template>

    <ng-content select="[comboPrefix]"></ng-content>
    <div>
      <ng-container *ngFor="let it of value; let index = index; trackBy: trackBy">
        <ng-container
          *ngTemplateOutlet="resolveTemplate(it) || fallbackTemplate; context: resolveTemplateContext(it, index)"
        ></ng-container>
      </ng-container>
      <input
        type="text"
        [placeholder]="(!value?.length && placeholder) || ''"
        [value]="inputValue || ''"
        [readOnly]="readOnly.isSet"
        [disabled]="disabled.isSet"
        #inputElement
      />
    </div>
    <ng-content select="[comboSuffix]"></ng-content>
  `,
})
export class ComboBox<T = any> extends ComboBoxBase<T> implements OnInit {
  private _latestInputValueOnBackspaceDown: string;
  private _backspaceToPop = true;
  private _enterToPush = true;

  @ViewChild('inputElement', { static: true }) protected readonly inputRef: ElementRef<HTMLInputElement>;

  @Input() inputValue: string;
  @Input() inputParser: (str: string) => T = (str) => str as any;

  @Input()
  set enterToPush(value: boolean) {
    this._enterToPush = coerceBooleanProperty(value);
  }
  get enterToPush(): boolean {
    return this._enterToPush;
  }

  @Input()
  set backspaceToPop(value: boolean) {
    this._backspaceToPop = coerceBooleanProperty(value);
  }
  get backspaceToPop(): boolean {
    return this._backspaceToPop;
  }

  @Input() trackBy: TrackByFunction<T> = (index, item) => item;

  ngOnInit() {
    this.listenUntilDestroyed(this.elementRef, 'click', () => {
      this.inputRef.nativeElement.focus();
    });
    this.listenUntilDestroyed('document', 'keyup.Enter', () => {
      const value = this.inputRef.nativeElement.value?.trim();
      if (this._enterToPush && this.focus.isSet && value) {
        this.inputRef.nativeElement.value = '';
        this.push(this.inputParser?.(value));
      }
    });
    this.listenUntilDestroyed('document', 'keydown.Backspace', () => {
      if (this._backspaceToPop) this._latestInputValueOnBackspaceDown = this.inputRef.nativeElement.value?.trim();
    });
    this.listenUntilDestroyed('document', 'keyup.Backspace', () => {
      if (this._backspaceToPop && this.focus.isSet && !this._latestInputValueOnBackspaceDown) this.pop();
    });
  }
}
