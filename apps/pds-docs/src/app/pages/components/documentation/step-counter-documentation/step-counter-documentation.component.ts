import { Component, ViewEncapsulation } from '@angular/core';
import { DEFAULT_DOCUMENTATION_TABS, HTML_ELEMENT_STATES } from '../../base-documentation/base-documentation.component';

@Component({
  selector: 'pds-app-step-counter-documentation',
  templateUrl: './step-counter-documentation.component.html',
  encapsulation: ViewEncapsulation.None
})
export class StepCounterDocumentationComponent {
  readonly DEFAULT_DOCUMENTATION_TABS = DEFAULT_DOCUMENTATION_TABS;
  readonly ELEMENT_STATES = Object.values(HTML_ELEMENT_STATES);

}
