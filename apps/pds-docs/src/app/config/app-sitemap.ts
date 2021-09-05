import { Provider } from '@angular/core';
import { Sitemap } from '@vitagroup/common';
import { AppDocChapters } from '../enums/app-doc-chapters';
import { AppDocPages } from '../enums/app-doc-pages.enum';
import { APP_DOC_PAGE_ROUTES } from '../pages/docs/app-docs-page.module';
import { APP_INTRO_PAGE_ROUTES } from '../pages/intro/app-intro-page.module';
import { APP_ROUTES } from './app-routes';

export const APP_SITEMAP_PROVIDER: Provider = {
  provide: Sitemap,
  useValue: new Sitemap({
    routes: APP_ROUTES,
    loadChildren: {
      '': APP_INTRO_PAGE_ROUTES,
      docs: {
        routes: APP_DOC_PAGE_ROUTES,
        loadParamValues: {
          ':chapter': Object.values(AppDocChapters),
          ':slug': Object.values(AppDocPages),
        },
      },
    },
  }),
};
