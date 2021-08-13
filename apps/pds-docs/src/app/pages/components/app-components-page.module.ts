import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DialogOverlayModule, SvgIconModule } from '@vitagroup/cdk';
import { FormStatusOutletModule } from '@vitagroup/cdk/forms';
import { FlexContainerModule } from '@vitagroup/cdk/layout';
import {
  AlertModule,
  CardModule,
  PdsCheckBoxModule,
  PdsComboBoxModule,
  PdsDropdownModule,
  PdsFabButtonModule,
  PdsInputDropdownModule,
  PdsRadioBoxModule,
  PdsRingLoaderModule,
  PdsSelectBoxModule,
  PdsSelectListModule,
  PdsTabsModule,
  PdsTagModule,
  PdsTextBoxModule,
  PdsToggleBoxModule
} from '@vitagroup/pds-components';
import { PdsPageLayoutModule } from '@vitagroup/pds-components/layout';
import { AppDialogComponentModule } from '../../components/app-dialog/app-dialog.component';
import { AppComponentsPageComponent } from './app-components-page.component';
import { AvatarDocumentationComponent } from './documentation/avatar/avatar-documentation.component';
import { BaseDocumentationComponent } from './base-documentation/base-documentation.component';
import {ButtonDocumentationComponent} from './documentation/button/button-documentation.component';
import {AlertDocumentationComponent} from './documentation/alert/alert-documentation.component';

export const APP_COMPONENTS_PAGE_ROUTES: Routes = [
  {
    path: '',
    component: AppComponentsPageComponent,
    data: {
      title: $localize`Components`
    }
  }
];

@NgModule({
  declarations: [
    AppComponentsPageComponent,
    AlertDocumentationComponent,
    AvatarDocumentationComponent,
    BaseDocumentationComponent,
    ButtonDocumentationComponent
  ],
  imports: [
    DialogOverlayModule,
    AppDialogComponentModule,
    RouterModule.forChild(APP_COMPONENTS_PAGE_ROUTES),
    FlexLayoutModule,
    PdsTextBoxModule,
    PdsComboBoxModule,
    PdsSelectBoxModule,
    PdsSelectListModule,
    CommonModule,
    PdsTagModule,
    FlexContainerModule,
    SvgIconModule,
    PdsRadioBoxModule,
    PdsCheckBoxModule,
    PdsTabsModule,
    CardModule,
    AlertModule,
    PdsDropdownModule,
    PdsInputDropdownModule,
    PdsToggleBoxModule,
    FormStatusOutletModule,
    ReactiveFormsModule,
    PdsRingLoaderModule,
    PdsPageLayoutModule,
    PdsFabButtonModule
  ]
})
export class AppComponentsPageModule {
}
