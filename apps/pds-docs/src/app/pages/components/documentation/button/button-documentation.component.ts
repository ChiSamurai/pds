import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DEFAULT_DOCUMENTATION_TABS, HTML_ELEMENT_STATES } from '../../base-documentation/base-documentation.component';

@Component({
  selector: 'pds-app-button-documentation',
  templateUrl: './button-documentation.component.html',
  styleUrls: ['./button-documentation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonDocumentationComponent {
  readonly DEFAULT_DOCUMENTATION_TABS = DEFAULT_DOCUMENTATION_TABS;
  buttonRanks = ['primary', 'secondary', 'tertiary', 'quaternary'];
  htmlElementStates = Object.values(HTML_ELEMENT_STATES);
}
