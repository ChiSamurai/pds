import { Component, ViewEncapsulation } from '@angular/core';
import { ElementFocusState, resolveElementFocusState, SelectionModel, SelectListBase } from '@vitagroup/cdk';

@Component({
  selector: 'pds-select-list',
  styleUrls: ['select-list.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { '[attr.tabindex]': '0' },
  providers: [
    { provide: SelectionModel, useExisting: SelectList },
    { provide: ElementFocusState, useFactory: resolveElementFocusState, deps: [SelectList] },
  ],
  template: `
    <ng-content select="pds-select-option"></ng-content>
  `,
})
export class SelectList<T = any> extends SelectListBase<T> {}
