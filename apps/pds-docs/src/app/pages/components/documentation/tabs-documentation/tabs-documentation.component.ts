import { Component, ViewEncapsulation } from '@angular/core';
import { DEFAULT_DOCUMENTATION_TABS, HTML_ELEMENT_STATES } from '../../base-documentation/base-documentation.component';

@Component({
  selector: 'pds-app-tabs-documentation',
  templateUrl: './tabs-documentation.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TabsDocumentationComponent {
  readonly DEFAULT_DOCUMENTATION_TABS = DEFAULT_DOCUMENTATION_TABS;
  readonly TABS_STATES = [
    ...Object.values(HTML_ELEMENT_STATES)
  ];

}
