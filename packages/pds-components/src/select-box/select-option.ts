import { Component, ViewEncapsulation } from '@angular/core';
import { SelectOptionBase } from '@vitagroup/cdk';

@Component({
  selector: 'pds-select-option',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['select-option.scss'],
  providers: [{ provide: SelectOptionBase, useExisting: SelectOption }],
  template: `
    <ng-content></ng-content>
  `,
})
export class SelectOption<T = any> extends SelectOptionBase<T> {}
