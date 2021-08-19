import { Component, ViewEncapsulation } from '@angular/core';
import { DEFAULT_DOCUMENTATION_TABS } from '../../base-documentation/base-documentation.component';

@Component({
  selector: 'pds-app-badge-documentation',
  templateUrl: './badge-documentation.component.html',
  encapsulation: ViewEncapsulation.None
})
export class BadgeDocumentationComponent {
  readonly DEFAULT_DOCUMENTATION_TABS = DEFAULT_DOCUMENTATION_TABS;

  stringValue = 'Label';
  numberValue = 1337;
  stringClipTo = 3;
  numberClipTo = 1000;

}
