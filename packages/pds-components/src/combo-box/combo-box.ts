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
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  ComboBoxBase,
  ControlInputAccessor,
  ElementFocusState,
  INPUT_ACCESSOR,
  resolveElementFocusState,
} from '@vitagroup/cdk';
import { PrimitiveBehaviorState, ShortcutManager } from '@vitagroup/common';

@Component({
  selector: 'pds-combo-box',
  styleUrls: ['combo-box.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: ComboBox, multi: true },
    { provide: INPUT_ACCESSOR, useExisting: ComboBox },
    { provide: ElementFocusState, useFactory: resolveElementFocusState, deps: [ComboBox] },
  ],
  host: {
    '[attr.tabindex]': '-1',
  },
  template: `
    <ng-template #fallbackTemplate let-value let-last="last">
      <span>{{ value }}{{ !last ? ', ' : '' }}</span>
    </ng-template>

    <ng-content select="[pdsBefore]"></ng-content>
    <div>
      <ng-container *ngFor="let it of value; let index = index; trackBy: trackBy">
        <ng-container
          *ngTemplateOutlet="resolveTemplate(it) || fallbackTemplate; context: resolveTemplateContext(it, index)"
        ></ng-container>
      </ng-container>
      <input
        type="text"
        tabindex="0"
        [placeholder]="(!value?.length && placeholder) || ''"
        [value]="(input.asObservable() | async) || ''"
        [readOnly]="readOnly.isSet"
        [disabled]="disabled.isSet"
        (input)="input.patch($any($event.target)?.value)"
        (blur)="focus.canUnset($event.relatedTarget) && focus.unset()"
        (focus)="focus.set()"
        #inputElement
      />
    </div>
    <ng-content select="[pdsAfter]"></ng-content>
  `,
})
export class ComboBox<T = any> extends ComboBoxBase<T> implements ControlInputAccessor, OnInit {
  @ViewChild('inputElement', { static: true })
  protected readonly inputRef: ElementRef<HTMLInputElement>;

  readonly input = new PrimitiveBehaviorState<string>();

  @Input() inputParser: (str: string) => T = (str) => str as any;

  @Input() trackBy: TrackByFunction<T> = (index, item) => item;

  ngOnInit() {
    super.ngOnInit();

    this.shortcuts.register('enter', () => {
      const value = this.inputRef.nativeElement.value?.trim();

      if (value) {
        this.inputRef.nativeElement.value = '';
        this.input.patch('');

        this.push(this.inputParser?.(value));
      }
    });
    this.shortcuts.register('backspace', () => {
      if (!this.inputRef.nativeElement.value?.trim()) this.pop();
    });
  }
}
