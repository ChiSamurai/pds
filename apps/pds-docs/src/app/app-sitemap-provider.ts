import { Provider } from '@angular/core';
import { Sitemap } from '@vitagroup/common';
import { APP_ROUTES } from './app-routes';
import { AppComponentPages } from './enums/app-component-pages.enum';
import { APP_COMPONENTS_PAGE_ROUTES } from './pages/components/app-components-page.module';
import { APP_CSS_PAGE_ROUTES } from './pages/css/app-css-page.module';
import { APP_GUIDES_PAGE_ROUTES } from './pages/guides/app-guides-page.module';
import { APP_INTRO_PAGE_ROUTES } from './pages/intro/app-intro-page.module';

export const APP_SITEMAP_PROVIDER: Provider = {
  provide: Sitemap,
  useValue: new Sitemap({
    routes: APP_ROUTES,
    loadChildren: {
      '': APP_INTRO_PAGE_ROUTES,
      guides: APP_GUIDES_PAGE_ROUTES,
      components: {
        routes: APP_COMPONENTS_PAGE_ROUTES,
        loadParamValues: {
          ':component': Object.values(AppComponentPages),
        },
      },
      css: APP_CSS_PAGE_ROUTES,
    },
  }),
};
