import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLayoutModule } from '@vitagroup/cdk/layout';
import { AppComponentsPageComponent } from './app-components-page.component';

export const APP_COMPONENTS_PAGE_ROUTES: Routes = [
  {
    path: '',
    component: AppComponentsPageComponent,
    data: {
      title: $localize`Components`,
    },
  },
];

@NgModule({
  declarations: [AppComponentsPageComponent],
  imports: [RouterModule.forChild(APP_COMPONENTS_PAGE_ROUTES), PageLayoutModule],
})
export class AppComponentsPageModule {}
