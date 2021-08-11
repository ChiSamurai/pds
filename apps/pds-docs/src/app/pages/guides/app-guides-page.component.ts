import { Component, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppGuidesService } from '../../services/app-guides.service';

@Component({
  selector: 'pds-app-guides-page',
  templateUrl: 'app-guides-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppGuidesPageComponent {
  chapters = this.appGuides.asObservable().pipe(map(() => this.appGuides.chapters));

  constructor(readonly appGuides: AppGuidesService) {}
}
