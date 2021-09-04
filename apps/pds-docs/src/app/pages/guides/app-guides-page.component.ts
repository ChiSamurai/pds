import { Component, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppGuidesService } from '../../services/app-guides.service';

@Component({
  selector: 'pds-app-guides-page',
  templateUrl: 'app-guides-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppGuidesPageComponent {
  readonly excludedChapters = ['Getting Started', 'Components', 'Css'];

  chapters = this.appGuides
    .asObservable()
    .pipe(map(() => this.appGuides.chapters?.filter((chapter) => !this.excludedChapters.includes(chapter))));

  constructor(readonly appGuides: AppGuidesService) {}
}
