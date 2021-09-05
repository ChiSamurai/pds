import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../pages/intro/app-intro-page.module').then((m) => m.AppIntroPageModule),
    data: {
      title: $localize`Introduction`,
    },
  },
  {
    path: 'docs',
    loadChildren: () => import('../pages/docs/app-docs-page.module').then((m) => m.AppDocsPageModule),
    data: {
      title: $localize`Docs`,
    },
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/',
  },
];
