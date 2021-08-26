import { Component, ViewEncapsulation } from '@angular/core';
import { MY_NAV_ENTRIES, MY_SECONDARY_NAV_ENTRIES } from './nav-documentation-entry-customized-snippet';

@Component({
  selector: 'pds-app-nav-documentation-entry-customized-snippet',
  templateUrl: './nav-documentation-entry-customized-snippet.html',
  encapsulation: ViewEncapsulation.None
})
export class NavDocumentationEntryCustomizedSnippetComponent {

  readonly MY_NAV_ENTRIES = MY_NAV_ENTRIES;
  readonly MY_SECONDARY_NAV_ENTRIES = MY_SECONDARY_NAV_ENTRIES;
}
