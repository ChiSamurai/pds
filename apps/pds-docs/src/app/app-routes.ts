import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'search',
    loadChildren: () => import('./pages/search/app-search-page.module').then((m) => m.AppSearchPageModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'search',
  },
];
