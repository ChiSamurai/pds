import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import { customEntryStyle, MY_NAV_ENTRIES, MY_SECONDARY_NAV_ENTRIES } from './nav-documentation-entry-icons-snippet';
import { PdsNavModule } from '@vitagroup/pds-components';
import { SvgIconModule } from '@vitagroup/cdk';

@Component({
  selector: 'pds-app-nav-documentation-entry-icons-snippet',
  templateUrl: './nav-documentation-entry-icons-snippet.html',
  encapsulation: ViewEncapsulation.None
})
export class NavDocumentationEntryIconsSnippetComponent {

  readonly MY_NAV_ENTRIES = MY_NAV_ENTRIES;
  readonly MY_SECONDARY_NAV_ENTRIES = MY_SECONDARY_NAV_ENTRIES;

  customEntryStyle = customEntryStyle;
}

@NgModule({
  imports: [
    PdsNavModule,
    SvgIconModule
  ],
  declarations: [NavDocumentationEntryIconsSnippetComponent],
  exports: [NavDocumentationEntryIconsSnippetComponent]
})
export class NavDocumentationEntryIconsSnippetModule {
}
