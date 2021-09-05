import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ArrayBehaviorState, normalizeUrl } from '@vitagroup/common';
import { map, tap } from 'rxjs/operators';
import { AppDocChapters } from '../enums/app-doc-chapters';
import { AppDoc, AppDocWithContent } from '../interfaces/app-doc.interface';

export const APP_DOC_BASE_URL = new InjectionToken('The base url of the app guides asset directory', {
  providedIn: 'root',
  factory: () => '/assets/guides',
});

@Injectable({ providedIn: 'root' })
export class AppDocService extends ArrayBehaviorState<AppDoc> {
  get chapters(): Array<AppDocChapters | string> {
    return this.snapshot
      ?.map((guide) => guide.chapter)
      ?.filter((chapter, index, array) => array.indexOf(chapter) === index);
  }

  constructor(@Inject(APP_DOC_BASE_URL) readonly baseUrl: string, protected http: HttpClient) {
    super();
  }

  get(slug: string): AppDoc | null {
    return this.snapshot?.find((guide) => guide.slug === slug);
  }
  getChapter(chapter: AppDocChapters | string): AppDoc[] | null {
    return this.snapshot?.filter((guide) => guide.chapter === chapter);
  }

  has(slug: string): boolean {
    return this.get(slug) != null;
  }

  resolve(slug: string): Promise<AppDocWithContent> {
    const doc = this.get(slug);
    return this.http
      .get(normalizeUrl(this.baseUrl, `${doc.src || doc.slug}.md`), { responseType: 'text' })
      .pipe(map((content) => ({ ...doc, content })))
      .toPromise();
  }

  pushOrUpdate(guide: AppDoc): AppDoc[] {
    if (this.has(guide.slug)) {
      const index = this.snapshot.findIndex(({ slug }) => slug === guide.slug);
      return this.patch([guide], index);
    } else {
      return this.push(guide);
    }
  }

  import(path: string): Promise<AppDoc[]> {
    if (!path.endsWith('.json')) path = normalizeUrl(path, 'index.json');
    return this.http
      .get<AppDoc[]>(normalizeUrl(this.baseUrl, path), { responseType: 'json' })
      .pipe(tap((guides) => guides.forEach(this.pushOrUpdate.bind(this))))
      .toPromise();
  }
}
