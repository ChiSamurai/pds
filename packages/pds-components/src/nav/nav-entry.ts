import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationEntryLink } from '@vitagroup/cdk';

@Component({
  selector: 'pds-nav-entry',
  styleUrls: ['nav-entry.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: RouterLink, useExisting: NavEntry }],
  template: `
    <ng-content></ng-content>
  `,
})
export class NavEntry extends NavigationEntryLink {}
