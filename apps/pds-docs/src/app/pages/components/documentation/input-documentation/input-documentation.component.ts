import { Component, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import {
  DEFAULT_DOCUMENTATION_TABS,
  HTML_ELEMENT_SEMANTICS,
  HTML_ELEMENT_STATES
} from '../../base-documentation/base-documentation.component';
import { BaseDocumentationCardComponent } from '../../base-documentation/base-documentation-card/base-documentation-card.component';

@Component({
  selector: 'pds-app-input-documentation',
  templateUrl: './input-documentation.component.html',
  encapsulation: ViewEncapsulation.None
})
export class InputDocumentationComponent {
  @ViewChildren(BaseDocumentationCardComponent) documentationCards: QueryList<BaseDocumentationCardComponent>;

  inputValue: string = null;

  readonly DEFAULT_DOCUMENTATION_TABS = DEFAULT_DOCUMENTATION_TABS;
  htmlElementStates = [
    ...Object.values(HTML_ELEMENT_STATES),
    ...Object.values(HTML_ELEMENT_SEMANTICS)
  ];
}
