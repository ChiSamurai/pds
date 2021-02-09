import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/intro/app-intro-page.module').then((m) => m.AppIntroPageModule),
  },
  {
    path: 'guides',
    loadChildren: () => import('./pages/guides/app-guides-page.module').then((m) => m.AppGuidesPageModule),
  },
  {
    path: 'components',
    loadChildren: () => import('./pages/components/app-components-page.module').then((m) => m.AppComponentsPageModule),
  },
  {
    path: 'css',
    loadChildren: () => import('./pages/css/app-css-page.module').then((m) => m.AppCssPageModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/',
  },
];
