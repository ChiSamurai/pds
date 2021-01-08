import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLayoutModule } from '@vitagroup/cdk/layout';
import { AppGuidesPageComponent } from './app-guides-page.component';

export const APP_GUIDES_PAGE_ROUTES: Routes = [
  {
    path: '',
    component: AppGuidesPageComponent,
    data: {
      title: $localize`Guides`,
    },
  },
];

@NgModule({
  declarations: [AppGuidesPageComponent],
  exports: [AppGuidesPageComponent],
  imports: [RouterModule.forChild(APP_GUIDES_PAGE_ROUTES), PageLayoutModule],
})
export class AppGuidesPageModule {}
