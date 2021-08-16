import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {
  DEFAULT_DOCUMENTATION_TABS,
  HTML_ELEMENT_SEMANTICS,
  HTML_ELEMENT_STATES
} from '../../base-documentation/base-documentation.component';

@Component({
  selector: 'pds-app-form-elements-documentation',
  templateUrl: './form-elements-documentation.component.html',
  styleUrls: ['./form-elements-documentation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormElementsDocumentationComponent {
  readonly DEFAULT_DOCUMENTATION_TABS = DEFAULT_DOCUMENTATION_TABS;
  htmlElementStates = [
    ...Object.values(HTML_ELEMENT_STATES),
    ...Object.values(HTML_ELEMENT_SEMANTICS)
  ];
}
