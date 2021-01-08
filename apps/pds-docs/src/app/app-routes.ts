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
    path: '**',
    pathMatch: 'full',
    redirectTo: '/',
  },
];
