import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import foo from './alert-documentation-basic-snippet';

@Component({
  selector: 'pds-app-alert-basic-snippet',
  templateUrl: `./alert-documentation-basic-snippet.html`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertDocumentationBasicSnippetComponent {
  foo = foo;
}
