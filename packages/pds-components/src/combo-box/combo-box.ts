import {
  ChangeDetectionStrategy,
  Component,
  Input,
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
    <ng-template #fallbackComboTemplate let-value>{{ value }}</ng-template>

    <ng-content select="[comboPrefix]"></ng-content>
    <div>
      <ng-container *ngFor="let comboValue of value; let index = index; trackBy: trackBy">
        <ng-container
          *ngTemplateOutlet="
            resolveComboTemplate(comboValue) || fallbackComboTemplate;
            context: resolveComboContext(comboValue, index)
          "
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
export class ComboBox<T = any> extends ComboBoxBase<T> {
  @ViewChild('inputElement', { static: true }) protected readonly inputRef;

  @Input() inputValue: string;
  @Input() trackBy: TrackByFunction<T> = (index, item) => item;
}
