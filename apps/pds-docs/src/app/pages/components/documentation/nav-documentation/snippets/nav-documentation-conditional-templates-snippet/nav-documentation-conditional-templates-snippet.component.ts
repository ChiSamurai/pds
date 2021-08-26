import { Component, ViewEncapsulation } from '@angular/core';
import {
  hasChildren,
  MY_NAV_ENTRIES_W_CHILDREN,
  MY_SECONDARY_NAV_ENTRIES
} from './nav-documentation-conditional-templates-snippet';

@Component({
  selector: 'pds-app-nav-documentation-conditional-templates-snippet',
  templateUrl: './nav-documentation-conditional-templates-snippet.html',
  encapsulation: ViewEncapsulation.None
})
export class NavDocumentationConditionalTemplatesSnippetComponent {

  readonly MY_NAV_ENTRIES_W_CHILDREN = MY_NAV_ENTRIES_W_CHILDREN;
  readonly MY_SECONDARY_NAV_ENTRIES = MY_SECONDARY_NAV_ENTRIES;

  hasChildren = hasChildren;

}
