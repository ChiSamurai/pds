import { Component, ViewEncapsulation } from '@angular/core';
import { ElementFocusState, resolveElementFocusState, SelectionModel, SelectListBase } from '@vitagroup/cdk';

@Component({
  selector: 'pds-select-list',
  styleUrls: ['select-list.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { '[attr.tabindex]': '0' },
  inputs: ['model', 'mode', 'limit', 'focusIndex', 'trackBy', 'allowsMultiple: multiple'],
  // eslint-disable-next-line @angular-eslint/no-outputs-metadata-property
  outputs: ['modelChange', 'change'],
  providers: [
    { provide: SelectionModel, useExisting: PdsSelectList },
    { provide: ElementFocusState, useFactory: resolveElementFocusState, deps: [PdsSelectList] },
  ],
  template: `
    <ng-content></ng-content>
  `,
})
export class PdsSelectList<T = any> extends SelectListBase<T> {}
