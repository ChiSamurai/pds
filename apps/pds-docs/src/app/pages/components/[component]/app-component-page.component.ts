import { Component } from '@angular/core';
import { AppGuidesService } from '../../../services/app-guides.service';

@Component({
  selector: 'pds-app-component-page',
  styles: [':host { display: block }'],
  template: `
    <pds-page-layout>
      <pds-page-header>
        <pds-tabs fxLayoutAlign="center">
          <ng-container *ngFor="let tab of displayTabs">
            <pds-tab [routerLinkOrHref]="tab" routerLinkActive="active">
              {{ tab | titlecase }}
            </pds-tab>
          </ng-container>
        </pds-tabs>
      </pds-page-header>

      <pds-page-content>
        <router-outlet></router-outlet>
      </pds-page-content>
    </pds-page-layout>
  `,
})
export class AppComponentPageComponent {
  readonly displayTabs = ['guide', 'api', 'example'];

  constructor(protected appGuides: AppGuidesService) {}
}
