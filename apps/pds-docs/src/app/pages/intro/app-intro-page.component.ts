import { Component, Inject, InjectionToken, ViewEncapsulation } from '@angular/core';
import { AppGuidesService } from '../../services/app-guides.service';

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
  readonly spotlightGuides = this.spotlightGuideSlugs
    .map((slug) => this.appGuides.get(slug))
    .filter((guide) => !!guide);

  constructor(
    @Inject(APP_INTRO_PAGE_SPOTLIGHT_GUIDES)
    readonly spotlightGuideSlugs: string[],
    protected appGuides: AppGuidesService
  ) {}
}
