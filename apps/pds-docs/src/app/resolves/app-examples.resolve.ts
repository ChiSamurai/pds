import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AppExample } from '../interfaces/app-example.interface';
import { AppExampleService } from '../services/app-example.service';
import { AppGuidesService } from '../services/app-guides.service';

@Injectable()
export class AppExamplesResolve implements Resolve<AppExample[]> {
  constructor(protected appExamples: AppExampleService, protected appGuides: AppGuidesService) {}

  resolve(route: ActivatedRouteSnapshot): Promise<AppExample[]> {
    const { slug, component } = route.params;
    const guide = this.appGuides.get(slug || component);

    return Promise.all(guide.examples?.map((example) => this.appExamples.resolve(example)));
  }
}
