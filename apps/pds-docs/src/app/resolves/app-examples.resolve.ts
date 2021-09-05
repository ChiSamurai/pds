import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { traverse } from '@vitagroup/common';
import { AppExample } from '../interfaces/app-example.interface';
import { AppDocService } from '../services/app-doc.service';
import { AppExampleService } from '../services/app-example.service';

@Injectable()
export class AppExamplesResolve implements Resolve<AppExample[]> {
  constructor(protected examples: AppExampleService, protected docs: AppDocService) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<AppExample[]> {
    const slug =
      route.params.slug ||
      traverse(
        route,
        (r) => r.parent,
        (r) => r.params?.slug
      )?.params.slug;

    const doc = this.docs.get(slug);
    return this.examples.resolveAll(doc.examples);
  }
}
