import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/overview/app-overview-page.module').then((m) => m.AppOverviewPageModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/',
  },
];
