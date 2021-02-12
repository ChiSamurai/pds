import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RADIO_BOX_TEMPLATE, RadioBoxBase } from '@vitagroup/cdk';

@Component({
  selector: 'pds-radio-box',
  styleUrls: ['./radio-box.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: RadioBox, multi: true },
    { provide: RadioBoxBase, useExisting: RadioBox },
  ],
  template: RADIO_BOX_TEMPLATE,
})
export class RadioBox extends RadioBoxBase {}
