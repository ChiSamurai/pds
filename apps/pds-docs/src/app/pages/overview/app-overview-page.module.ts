import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { SvgIconModule } from '@vitagroup/cdk';
import { PageLayoutModule } from '@vitagroup/cdk/layout';
import {
  CardModule,
  CheckBoxModule,
  ComboBoxModule,
  SelectBoxModule,
  SelectListModule,
  TagModule,
  TextBoxModule,
} from '@vitagroup/pds-components';
import { AppOverviewPageComponent } from './app-overview-page.component';

export const APP_SEARCH_PAGE_ROUTES: Routes = [
  {
    path: '',
    component: AppOverviewPageComponent,
    data: {
      title: $localize`Overview`,
    },
  },
];

@NgModule({
  exports: [AppOverviewPageComponent],
  declarations: [AppOverviewPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(APP_SEARCH_PAGE_ROUTES),
    PageLayoutModule,
    FlexLayoutModule,
    SelectBoxModule,
    SelectListModule,
    TagModule,
    SvgIconModule,
  ],
})
export class AppOverviewPageModule {}
