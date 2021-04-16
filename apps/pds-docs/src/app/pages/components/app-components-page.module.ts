import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DialogOverlayModule, SvgIconModule } from '@vitagroup/cdk';
import { FormStatusOutletModule } from '@vitagroup/cdk/forms';
import { FlexContainerModule, PageLayoutModule } from '@vitagroup/cdk/layout';
import {
  AlertModule,
  CardModule,
  CheckBoxModule,
  ComboBoxModule,
  DropdownModule,
  InputDropdownModule,
  RadioBoxModule,
  SelectBoxModule,
  SelectListModule,
  TabsModule,
  TagModule,
  TextBoxModule,
  ToggleBoxModule,
} from '@vitagroup/pds-components';
import { AppDialogComponentModule } from '../../components/app-dialog/app-dialog.component';
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
    DialogOverlayModule,
    AppDialogComponentModule,
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
    DropdownModule,
    InputDropdownModule,
    ToggleBoxModule,
    FormStatusOutletModule,
    ReactiveFormsModule,
  ],
})
export class AppComponentsPageModule {}
