import { ChangeDetectionStrategy, Component, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { DEFAULT_DOCUMENTATION_TABS, HTML_ELEMENT_STATES } from '../../base-documentation/base-documentation.component';
import { BaseDocumentationCardComponent } from '../../base-documentation/base-documentation-card/base-documentation-card.component';

@Component({
  selector: 'pds-app-button-documentation',
  templateUrl: './button-documentation.component.html',
  styleUrls: ['./button-documentation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonDocumentationComponent {
  @ViewChildren(BaseDocumentationCardComponent) documentationCards: QueryList<BaseDocumentationCardComponent>;
  readonly DEFAULT_DOCUMENTATION_TABS = DEFAULT_DOCUMENTATION_TABS;

  buttonRanks = ['primary', 'secondary', 'tertiary', 'quaternary'];
  htmlElementStates = Object.values(HTML_ELEMENT_STATES);
}
