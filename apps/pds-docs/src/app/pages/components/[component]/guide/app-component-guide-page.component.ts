import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppGuideWithContent } from '../../../../interfaces/app-guide.interface';

@Component({
  selector: 'pds-app-component-guide-page',
  styles: [':host { display: block }'],
  template: `
    <ng-container *ngIf="guideChanges | async as guide">
      <div [innerHTML]="guide.content | md"></div>
    </ng-container>
  `,
})
export class AppComponentGuidePageComponent {
  readonly guideChanges = this.route.parent.data.pipe(map((data) => data.guide as AppGuideWithContent));

  constructor(protected route: ActivatedRoute) {}
}
