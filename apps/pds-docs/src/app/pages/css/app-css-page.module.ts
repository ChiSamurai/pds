import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdsPageLayoutModule } from '@vitagroup/pds-components/layout';
import { AppCssPageComponent } from './app-css-page.component';

export const APP_CSS_PAGE_ROUTES: Routes = [
  {
    path: '',
    component: AppCssPageComponent,
  },
];

@NgModule({
  declarations: [AppCssPageComponent],
  imports: [RouterModule.forChild(APP_CSS_PAGE_ROUTES), PdsPageLayoutModule],
})
export class AppCssPageModule {}
