import { Component, ViewEncapsulation } from '@angular/core';
import { MY_NAV_ENTRIES, MY_SECONDARY_NAV_ENTRIES } from './nav-documentation-simple-snippet';

@Component({
  selector: 'pds-app-nav-documentation-simple-snippet',
  templateUrl: './nav-documentation-simple-snippet.html',
  encapsulation: ViewEncapsulation.None
})
export class NavDocumentationSimpleSnippetComponent {
  readonly MY_NAV_ENTRIES = MY_NAV_ENTRIES;
  readonly MY_SECONDARY_NAV_ENTRIES = MY_SECONDARY_NAV_ENTRIES;
}
