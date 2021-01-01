import { Component, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CHECK_BOX_TEMPLATE, CheckBoxBase } from '@vitagroup/cdk';

@Component({
  selector: 'pds-check-box',
  styleUrls: ['./check-box.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: CheckBox, multi: true }],
  template: CHECK_BOX_TEMPLATE,
})
export class CheckBox extends CheckBoxBase {}
