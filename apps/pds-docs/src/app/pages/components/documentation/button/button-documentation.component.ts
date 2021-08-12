import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import {
  DEFAULT_DOCUMENTATION_TABS
} from '../../base-documentation/base-documentation.component';

@Component({
  selector: 'pds-app-button-documentation',
  templateUrl: './button-documentation.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonDocumentationComponent {
  readonly DEFAULT_DOCUMENTATION_TABS = DEFAULT_DOCUMENTATION_TABS;
}
