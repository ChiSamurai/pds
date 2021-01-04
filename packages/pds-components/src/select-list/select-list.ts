import { Component, ViewEncapsulation } from '@angular/core';
import { SelectionModel, SelectListBase } from '@vitagroup/cdk';

@Component({
  selector: 'pds-select-list',
  styleUrls: ['select-list.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: SelectionModel, useExisting: SelectList }],
  template: `
    <ng-content select="pds-select-option"></ng-content>
  `,
})
export class SelectList<T = any> extends SelectListBase<T> {}
