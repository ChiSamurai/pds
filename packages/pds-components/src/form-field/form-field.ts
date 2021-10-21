import { Component, NgModule, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-form-field',
  styleUrls: ['form-field.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content select="label"></ng-content>
    <ng-content></ng-content>
  `,
})
export class PdsFormField {}

@NgModule({
  declarations: [PdsFormField],
  exports: [PdsFormField],
  imports: [],
})
export class PdsFormFieldModule {}
