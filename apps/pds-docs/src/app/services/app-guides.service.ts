import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Inject, Injectable, InjectionToken, Provider } from '@angular/core';
import { ArrayBehaviorState, normalizeUrl } from '@vitagroup/common';
import { map, tap } from 'rxjs/operators';
import { AppGuide, AppGuideWithContent } from '../interfaces/app-guide.interface';

export const APP_GUIDES_BASE_URL = new InjectionToken('The base url of the app guides asset directory', {
  providedIn: 'root',
  factory: () => '/assets/guides',
});

@Injectable({ providedIn: 'root' })
export class AppGuidesService extends ArrayBehaviorState<AppGuide> {
  get chapters(): string[] {
    return this.snapshot
      ?.map((guide) => guide.chapter)
      ?.filter((chapter, index, array) => array.indexOf(chapter) === index);
  }

  constructor(@Inject(APP_GUIDES_BASE_URL) readonly baseUrl: string, protected http: HttpClient) {
    super();
  }

  get(slug: string): AppGuide | null {
    return this.snapshot?.find((guide) => guide.slug === slug);
  }
  getChapter(chapter: string): AppGuide[] | null {
    return this.snapshot?.filter((guide) => guide.chapter === chapter);
  }

  has(slug: string): boolean {
    return this.get(slug) != null;
  }

  resolve(slug: string): Promise<AppGuideWithContent> {
    const guide = this.get(slug);
    return this.http
      .get(normalizeUrl(this.baseUrl, `${guide.src || guide.slug}.md`), { responseType: 'text' })
      .pipe(map((content) => ({ ...guide, content })))
      .toPromise();
  }

  pushOrUpdate(guide: AppGuide): AppGuide[] {
    if (this.has(guide.slug)) {
      const index = this.snapshot.findIndex(({ slug }) => slug === guide.slug);
      return this.patch([guide], index);
    } else {
      return this.push(guide);
    }
  }

  import(path: string): Promise<AppGuide[]> {
    if (!path.endsWith('.json')) path = normalizeUrl(path, 'index.json');
    return this.http
      .get<AppGuide[]>(normalizeUrl(this.baseUrl, path), { responseType: 'json' })
      .pipe(tap((guides) => guides.forEach(this.pushOrUpdate.bind(this))))
      .toPromise();
  }
}

export function initAppGuides(appGuides: AppGuidesService): () => void {
  return async () => {
    await appGuides.import('first-steps');

    await appGuides.import('common.json');
    await appGuides.import('cdk.json');
    await appGuides.import('components.json');
  };
}

export const APP_GUIDES_INIT_PROVIDER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initAppGuides,
  deps: [AppGuidesService],
  multi: true,
};
