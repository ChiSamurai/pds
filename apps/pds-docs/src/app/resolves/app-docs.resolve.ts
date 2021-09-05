import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { traverse } from '@vitagroup/common';
import { AppDoc } from '../interfaces/app-doc.interface';
import { AppDocService } from '../services/app-doc.service';

@Injectable()
export class AppDocsResolve implements Resolve<AppDoc[]> {
  constructor(protected docs: AppDocService) {}

  resolve(route: ActivatedRouteSnapshot): AppDoc[] {
    const chapter =
      route.params.chapter ||
      traverse(
        route,
        (r) => r.parent,
        (r) => r.params.chapter
      )?.params?.chapter;

    return chapter ? this.docs.getChapter(chapter) : this.docs.snapshot;
  }
}
