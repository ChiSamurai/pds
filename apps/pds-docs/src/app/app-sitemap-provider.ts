import { Provider } from '@angular/core';
import { Sitemap, SITEMAP } from '@vitagroup/common';
import { APP_ROUTES } from './app-routes';
import { APP_SEARCH_PAGE_ROUTES } from './pages/intro/app-intro-page.module';

export const APP_SITEMAP_PROVIDER: Provider = {
  provide: SITEMAP,
  useValue: new Sitemap({
    routes: APP_ROUTES,
    lazyChildren: {
      search: { routes: APP_SEARCH_PAGE_ROUTES },
    },
  }),
};
