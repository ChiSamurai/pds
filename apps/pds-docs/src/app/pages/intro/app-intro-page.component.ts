import { Component, Inject, InjectionToken, ViewEncapsulation } from '@angular/core';
import { AppDocService } from '../../services/app-doc.service';

export const APP_INTRO_PAGE_SPOTLIGHT_GUIDES = new InjectionToken<string[]>(
  'List of guide slugs presented on the intro page',
  {
    providedIn: 'root',
    factory: () => ['getting-started', 'styling'],
  }
);

@Component({
  selector: 'pds-app-intro-page',
  styleUrls: ['app-intro-page.component.scss'],
  templateUrl: 'app-intro-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppIntroPageComponent {
  readonly spotlightDocs = this.spotlightGuideSlugs.map((slug) => this.docs.get(slug)).filter((doc) => !!doc);

  constructor(
    @Inject(APP_INTRO_PAGE_SPOTLIGHT_GUIDES)
    readonly spotlightGuideSlugs: string[],
    protected docs: AppDocService
  ) {}
}
