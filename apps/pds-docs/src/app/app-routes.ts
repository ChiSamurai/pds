import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/intro/app-intro-page.module').then((m) => m.AppIntroPageModule),
    data: {
      title: $localize`Introduction`,
    },
  },
  {
    path: 'guides',
    loadChildren: () => import('./pages/guides/app-guides-page.module').then((m) => m.AppGuidesPageModule),
    data: {
      title: $localize`Guides`,
    },
  },
  {
    path: 'components',
    loadChildren: () => import('./pages/components/app-components-page.module').then((m) => m.AppComponentsPageModule),
    data: {
      title: $localize`Components`,
    },
  },
  {
    path: 'css',
    loadChildren: () => import('./pages/css/app-css-page.module').then((m) => m.AppCssPageModule),
    data: {
      title: $localize`CSS`,
    },
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/',
  },
];
