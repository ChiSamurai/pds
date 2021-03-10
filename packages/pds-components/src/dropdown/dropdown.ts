import { Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { DropdownDef } from './dropdown-def';

@Component({
  selector: 'pds-dropdown',
  styleUrls: ['./dropdown-overlay.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: ['preferredPosition'],
  template: `
    <ng-template #templateRef>
      <ng-content></ng-content>
    </ng-template>
  `,
})
export class Dropdown extends DropdownDef {
  @ViewChild('templateRef') template: TemplateRef<any>;

  constructor() {
    super(null);
  }
}
