import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/intro/app-intro-page.module').then((m) => m.AppIntroPageModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/',
  },
];
