import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLayoutModule } from '@vitagroup/cdk/layout';
import { AppCssPageComponent } from './app-css-page.component';

export const APP_COMPONENTS_PAGE_ROUTES: Routes = [
  {
    path: '',
    component: AppCssPageComponent,
    data: {
      title: $localize`CSS`,
    },
  },
];

@NgModule({
  declarations: [AppCssPageComponent],
  imports: [RouterModule.forChild(APP_COMPONENTS_PAGE_ROUTES), PageLayoutModule],
})
export class AppCssPageModule {}
