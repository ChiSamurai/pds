import { Component, ViewEncapsulation } from '@angular/core';
import { SELECTION_VALUE, SelectOptionBase } from '@vitagroup/cdk';

@Component({
  selector: 'pds-select-option',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['select-option.scss'],
  host: { '[attr.tabindex]': '0' },
  providers: [
    { provide: SelectOptionBase, useExisting: PdsSelectOption },
    { provide: SELECTION_VALUE, useExisting: PdsSelectOption },
  ],
  template: `
    <ng-content></ng-content>
  `,
})
export class PdsSelectOption<T = any> extends SelectOptionBase<T> {}
