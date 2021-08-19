import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import {
  DEFAULT_DOCUMENTATION_TABS
} from '../../base-documentation/base-documentation.component';

@Component({
  selector: 'pds-app-avatar-documentation',
  templateUrl: './avatar-documentation.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarDocumentationComponent {
  readonly DEFAULT_DOCUMENTATION_TABS = DEFAULT_DOCUMENTATION_TABS;
}
