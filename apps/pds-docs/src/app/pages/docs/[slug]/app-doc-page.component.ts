import { Component } from '@angular/core';
import { AppDocService } from '../../../services/app-doc.service';

@Component({
  selector: 'pds-app-doc-page',
  styles: [':host { display: block }'],
  template: `
    <pds-page-layout>
      <pds-page-header>
        <pds-divider vertical space="lg"></pds-divider>
        <pds-tabs fxLayoutAlign="center" fxFlex="100">
          <pds-tab routerLink="." routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
            Overview
          </pds-tab>

          <ng-container *ngIf="docs.get('slug' | routeParam | async)?.examples?.length > 0">
            <pds-tab routerLink="./examples" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
              Examples
            </pds-tab>
          </ng-container>
        </pds-tabs>
        <pds-divider vertical space="lg"></pds-divider>
      </pds-page-header>

      <pds-page-content>
        <router-outlet></router-outlet>
      </pds-page-content>
    </pds-page-layout>
  `,
})
export class AppDocPageComponent {
  constructor(readonly docs: AppDocService) {}
}
