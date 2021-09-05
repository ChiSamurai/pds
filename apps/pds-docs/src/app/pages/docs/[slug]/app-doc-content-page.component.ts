import { Component } from '@angular/core';

@Component({
  selector: 'pds-app-docs-content-page',
  styles: [':host { display: block }'],
  template: `
    <ng-container *ngIf="'doc' | routeData | async as doc">
      <div [innerHTML]="doc.content | md"></div>
    </ng-container>
  `,
})
export class AppDocContentPageComponent {}
