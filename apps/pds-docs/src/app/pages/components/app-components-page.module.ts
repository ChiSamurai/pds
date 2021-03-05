import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SvgIconModule } from '@vitagroup/cdk';
import { FormStatusOutletModule } from '@vitagroup/cdk/forms';
import { FlexContainerModule, PageLayoutModule } from '@vitagroup/cdk/layout';
import {
  AlertModule,
  CardModule,
  CheckBoxModule,
  ComboBoxModule,
  RadioBoxModule,
  SelectBoxModule,
  SelectListModule,
  TabsModule,
  TagModule,
  TextBoxModule,
} from '@vitagroup/pds-components';
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
  imports: [
    RouterModule.forChild(APP_COMPONENTS_PAGE_ROUTES),
    PageLayoutModule,
    FlexLayoutModule,
    TextBoxModule,
    ComboBoxModule,
    SelectBoxModule,
    SelectListModule,
    CommonModule,
    TagModule,
    FlexContainerModule,
    SvgIconModule,
    RadioBoxModule,
    CheckBoxModule,
    TabsModule,
    CardModule,
    AlertModule,
  ],
})
export class AppComponentsPageModule {}
