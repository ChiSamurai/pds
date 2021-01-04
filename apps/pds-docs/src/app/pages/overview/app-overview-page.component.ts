import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-app-overview-page',
  styleUrls: ['app-overview-page.component.scss'],
  templateUrl: 'app-overview-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppOverviewPageComponent {
  readonly packageInfos = [
    { name: 'PDS Components', description: 'Collection of reusable components integrating the PDS CSS styleguide' },
    { name: 'PDS CSS', description: 'Generic (S)CSS layer for simplified styleguide adoption' },
    { name: 'Common', description: 'Collection of commonly as well as partially experimental features' },
    { name: 'CDK', description: 'Component Development Kit also featuring the components' },
  ];
}
