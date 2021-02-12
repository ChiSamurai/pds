import { Component, ViewEncapsulation } from '@angular/core';
import { SELECTION_VALUE, SelectOptionBase } from '@vitagroup/cdk';

@Component({
  selector: 'pds-select-option',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['select-option.scss'],
  providers: [
    { provide: SelectOptionBase, useExisting: SelectOption },
    { provide: SELECTION_VALUE, useExisting: SelectOption },
  ],
  template: `
    <ng-content></ng-content>
  `,
})
export class SelectOption<T = any> extends SelectOptionBase<T> {}
