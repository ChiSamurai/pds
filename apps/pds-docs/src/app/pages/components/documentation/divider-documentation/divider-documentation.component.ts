import { Component, ViewEncapsulation } from '@angular/core';
import { DEFAULT_DOCUMENTATION_TABS } from '../../base-documentation/base-documentation.component';

@Component({
  selector: 'pds-app-divider-documentation',
  templateUrl: './divider-documentation.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dividerContainer {
      height: 8em;
    }
  `]
})
export class DividerDocumentationComponent {
  readonly DEFAULT_DOCUMENTATION_TABS = DEFAULT_DOCUMENTATION_TABS;
}
