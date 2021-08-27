import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import {
  customEntryStyle,
  MY_NAV_ENTRIES,
  MY_SECONDARY_NAV_ENTRIES
} from './nav-documentation-entry-templates-snippet';
import { PdsNavModule } from '@vitagroup/pds-components';
import { SvgIconModule } from '@vitagroup/cdk';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pds-app-nav-documentation-entry-templates-snippet',
  templateUrl: './nav-documentation-entry-templates-snippet.html',
  encapsulation: ViewEncapsulation.None
})
export class NavDocumentationEntryTemplatesSnippetComponent {

  readonly MY_NAV_ENTRIES = MY_NAV_ENTRIES;
  readonly MY_SECONDARY_NAV_ENTRIES = MY_SECONDARY_NAV_ENTRIES;

  customEntryStyle = customEntryStyle;
}

@NgModule({
  imports: [
    CommonModule,
    PdsNavModule,
    SvgIconModule
  ],
  declarations: [NavDocumentationEntryTemplatesSnippetComponent],
  exports: [NavDocumentationEntryTemplatesSnippetComponent]
})
export class NavDocumentationEntryTemplatesSnippetModule {
}

