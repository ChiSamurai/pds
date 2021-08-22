import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DialogOverlayModule, SelectionModule, SvgIconModule } from '@vitagroup/cdk';
import { FormStatusOutletModule } from '@vitagroup/cdk/forms';
import { FlexContainerModule } from '@vitagroup/cdk/layout';
import { ClipPipeModule, RouteDataPipeModule, RouterLinkOrHrefModule } from '@vitagroup/common';
import {
  PdsAlertModule,
  PdsBadgeModule,
  PdsCardModule,
  PdsCheckBoxModule,
  PdsChipModule,
  PdsComboBoxModule,
  PdsDropdownModule,
  PdsInputDropdownModule,
  PdsRadioBoxModule,
  PdsRingLoaderModule,
  PdsSelectBoxModule,
  PdsSelectListModule,
  PdsTabsModule,
  PdsTextBoxModule,
  PdsToggleBoxModule,
} from '@vitagroup/pds-components';
import { PdsPageLayoutModule } from '@vitagroup/pds-components/layout';
import { AppDialogComponentModule } from '../../components/app-dialog/app-dialog.component';
import { AppGuideCardModule } from '../../components/app-guide-card/app-guide-card.component';
import { MarkedPipeModule } from '../../pipes/marked.pipe';
import { AppGuideResolve } from '../../resolves/app-guide.resolve';
import { AppComponentApiPageComponent } from './[component]/api/app-component-api-page.component';
import { AppComponentPageComponent } from './[component]/app-component-page.component';
import { AppComponentExamplePageComponent } from './[component]/example/app-component-example-page.component';
import { AppComponentGuidePageComponent } from './[component]/guide/app-component-guide-page.component';
import { AppComponentsPageComponent } from './app-components-page.component';

export const APP_COMPONENTS_PAGE_ROUTES: Routes = [
  {
    path: '',
    component: AppComponentsPageComponent,
  },
  {
    path: ':component',
    component: AppComponentPageComponent,
    resolve: {
      guide: AppGuideResolve,
    },
    children: [
      {
        path: 'guide',
        component: AppComponentGuidePageComponent,
      },
      {
        path: 'api',
        component: AppComponentApiPageComponent,
      },
      {
        path: 'example',
        component: AppComponentExamplePageComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'guide',
      },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponentsPageComponent,
    AppComponentPageComponent,
    AppComponentGuidePageComponent,
    AppComponentApiPageComponent,
    AppComponentExamplePageComponent,
  ],
  providers: [AppGuideResolve],
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
    PdsChipModule,
    FlexContainerModule,
    SvgIconModule,
    PdsRadioBoxModule,
    PdsCheckBoxModule,
    PdsTabsModule,
    PdsCardModule,
    PdsAlertModule,
    PdsDropdownModule,
    PdsInputDropdownModule,
    PdsToggleBoxModule,
    FormStatusOutletModule,
    ReactiveFormsModule,
    PdsRingLoaderModule,
    PdsPageLayoutModule,
    PdsBadgeModule,
    ClipPipeModule,
    RouteDataPipeModule,
    MarkedPipeModule,
    SelectionModule,
    PdsTabsModule,
    RouterLinkOrHrefModule,
    AppGuideCardModule,
  ],
})
export class AppComponentsPageModule {}
