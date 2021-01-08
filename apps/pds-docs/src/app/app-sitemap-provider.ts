import { Provider } from '@angular/core';
import { Sitemap, SITEMAP } from '@vitagroup/common';
import { APP_ROUTES } from './app-routes';
import { APP_GUIDES_PAGE_ROUTES } from './pages/guides/app-guides-page.module';
import { APP_INTRO_PAGE_ROUTES } from './pages/intro/app-intro-page.module';

export const APP_SITEMAP_PROVIDER: Provider = {
  provide: SITEMAP,
  useValue: new Sitemap({
    routes: APP_ROUTES,
    lazyChildren: {
      '': { routes: APP_INTRO_PAGE_ROUTES },
      guides: { routes: APP_GUIDES_PAGE_ROUTES },
    },
  }),
};
