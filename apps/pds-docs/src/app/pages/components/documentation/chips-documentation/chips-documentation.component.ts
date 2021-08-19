import { Component, ViewEncapsulation } from '@angular/core';
import { DEFAULT_DOCUMENTATION_TABS, HTML_ELEMENT_STATES } from '../../base-documentation/base-documentation.component';

@Component({
  selector: 'pds-app-chips-documentation',
  templateUrl: './chips-documentation.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ChipsDocumentationComponent {
  readonly DEFAULT_DOCUMENTATION_TABS = DEFAULT_DOCUMENTATION_TABS;
  readonly TAGS_STATES = Object.values(HTML_ELEMENT_STATES);

  stringValue = 'Label';
  numberValue = 1337;
  stringClipTo = 3;
  numberClipTo = 1000;

}
