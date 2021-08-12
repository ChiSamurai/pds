import { Component, NgModule, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-divider',
  styleUrls: ['./divider.scss'],
  encapsulation: ViewEncapsulation.None,
  template: ``,
})
export class PdsDivider {}

@NgModule({
  declarations: [PdsDivider],
  exports: [PdsDivider],
})
export class PdsDividerModule {}
