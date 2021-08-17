import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule, Routes } from '@angular/router';
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
import { ButtonDocumentationComponent } from './documentation/button/button-documentation.component';
import { AlertDocumentationComponent } from './documentation/alert/alert-documentation.component';
import { CardDocumentationComponent } from './documentation/card/card-documentation.component';
import { TogglesDocumentationComponent } from './documentation/toggles/toggles-documentation.component';
import { AppGuideCardModule } from '../../components/app-guide-card/app-guide-card.component';
import { FormElementsDocumentationComponent } from './documentation/form-elements-documentation/form-elements-documentation.component';
import { BaseDocumentationCardComponent } from './base-documentation/base-documentation-card/base-documentation-card.component';

interface IDocComponentRouteDef {
  name: string;
  comp: any;
}

const docComponents: IDocComponentRouteDef[] = [
  {
    name: 'alert',
    comp: AlertDocumentationComponent
  },
  {
    name: 'button',
    comp: ButtonDocumentationComponent
  },
  {
    name: 'card',
    comp: CardDocumentationComponent
  },
  {
    name: 'form-elements',
    comp: FormElementsDocumentationComponent
  },
  {
    name: 'toggles',
    comp: TogglesDocumentationComponent
  }
];

export const APP_COMPONENTS_PAGE_ROUTES: Routes = [
  {
    path: '',
    component: AppComponentsPageComponent,
    data: {
      title: $localize`Components`
    }
  }
];

function generateRoutes(): Routes {
  const staticRoutes = [];
  docComponents.forEach(docCompDef => {
    staticRoutes.push({
      path: docCompDef.name,
      pathMatch: 'full',
      component: docCompDef.comp,
      data: {
        title: $localize`${docCompDef.name}`,
        inline: false
      }
    } as Route);
  });
  staticRoutes.push(...APP_COMPONENTS_PAGE_ROUTES);
  return staticRoutes;
}

@NgModule({
  declarations: [
    AppComponentsPageComponent,
    AlertDocumentationComponent,
    AvatarDocumentationComponent,
    BaseDocumentationComponent,
    ButtonDocumentationComponent,
    CardDocumentationComponent,
    TogglesDocumentationComponent,
    FormElementsDocumentationComponent,
    BaseDocumentationCardComponent
  ],
  imports: [
    DialogOverlayModule,
    AppDialogComponentModule,
    RouterModule.forChild(generateRoutes()),
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
    PdsFabButtonModule,
    AppGuideCardModule
  ]
})
export class AppComponentsPageModule {
}
