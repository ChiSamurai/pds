import { Directive } from '@angular/core';

/** Trivial marker directive for page content querying */
@Directive({ selector: 'page-content, [pageContent]' })
export class PageContent {
}
