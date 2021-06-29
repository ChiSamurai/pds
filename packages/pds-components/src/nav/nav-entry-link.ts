import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavEntryLink } from '@vitagroup/cdk';

@Component({
  selector: 'pds-nav-entry',
  styleUrls: ['nav-entry.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: RouterLink, useExisting: PdsNavEntryLink }],
  template: `
    <ng-content></ng-content>
  `,
})
export class PdsNavEntryLink extends NavEntryLink {}
