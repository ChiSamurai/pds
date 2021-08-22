import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AppGuideWithContent } from '../interfaces/app-guide.interface';
import { AppGuidesService } from '../services/app-guides.service';

@Injectable()
export class AppGuideResolve implements Resolve<AppGuideWithContent> {
  constructor(protected appGuides: AppGuidesService) {}

  resolve(route: ActivatedRouteSnapshot): Promise<AppGuideWithContent> {
    const { slug, component } = route.params;

    return this.appGuides.resolve(slug || component);
  }
}
