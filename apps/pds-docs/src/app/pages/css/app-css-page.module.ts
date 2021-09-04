import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { PdsPageLayoutModule } from '@vitagroup/pds-components/layout';
import { AppGuideCardModule } from '../../components/app-guide-card/app-guide-card.component';
import { AppCssPageComponent } from './app-css-page.component';

export const APP_CSS_PAGE_ROUTES: Routes = [
  {
    path: '',
    component: AppCssPageComponent,
  },
];

@NgModule({
  declarations: [AppCssPageComponent],
  imports: [
    RouterModule.forChild(APP_CSS_PAGE_ROUTES),
    PdsPageLayoutModule,
    CommonModule,
    AppGuideCardModule,
    FlexLayoutModule,
  ],
})
export class AppCssPageModule {}
