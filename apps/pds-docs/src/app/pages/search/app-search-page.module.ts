import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLayoutModule } from '@vitagroup/cdk/layout';
import { AppSearchPageComponent } from './app-search-page.component';

export const APP_SEARCH_PAGE_ROUTES: Routes = [
  {
    path: '',
    component: AppSearchPageComponent,
    data: {
      title: $localize`Overview`,
    },
  },
];

@NgModule({
  exports: [AppSearchPageComponent],
  declarations: [AppSearchPageComponent],
  imports: [RouterModule.forChild(APP_SEARCH_PAGE_ROUTES), PageLayoutModule],
})
export class AppSearchPageModule {}
