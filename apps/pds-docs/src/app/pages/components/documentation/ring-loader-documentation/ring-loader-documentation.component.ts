import { Component, ViewEncapsulation } from '@angular/core';
import { DEFAULT_DOCUMENTATION_TABS, HTML_ELEMENT_STATES } from '../../base-documentation/base-documentation.component';

@Component({
  selector: 'pds-app-ring-loader-documentation',
  templateUrl: './ring-loader-documentation.component.html',
  encapsulation: ViewEncapsulation.None
})
export class RingLoaderDocumentationComponent {
  readonly DEFAULT_DOCUMENTATION_TABS = DEFAULT_DOCUMENTATION_TABS;
  readonly HTML_ELEMENT_STATES = Object.values(HTML_ELEMENT_STATES);
}
