import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DEFAULT_DOCUMENTATION_TABS } from '../../base-documentation/base-documentation.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pds-app-alert-documentation',
  templateUrl: './alert-documentation.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    pds-alert {
      margin: 1em;
    }
  `]
})
export class AlertDocumentationComponent {
  readonly DEFAULT_DOCUMENTATION_TABS = DEFAULT_DOCUMENTATION_TABS;

  constructor(protected httpClient: HttpClient) {
  }
}
