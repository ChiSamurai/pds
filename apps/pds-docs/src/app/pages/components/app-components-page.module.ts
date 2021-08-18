import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule, Routes } from '@angular/router';
import { DialogOverlayModule, SelectionModule, SvgIconModule } from '@vitagroup/cdk';
import { FormStatusOutletModule } from '@vitagroup/cdk/forms';
import { FlexContainerModule } from '@vitagroup/cdk/layout';
import {
  AlertModule,
  CardModule,
  PdsCheckBoxModule,
  PdsComboBoxModule,
  PdsDropdownModule,
  PdsFabButtonModule,
  PdsFormStatusModule,
  PdsInputDropdownModule,
  PdsRadioBoxModule,
  PdsRingLoaderModule,
  PdsSelectBoxModule,
  PdsSelectListModule,
  PdsStepCounterModule,
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
import { BaseDocumentationCardComponent } from './base-documentation/base-documentation-card/base-documentation-card.component';
import { TabsDocumentationComponent } from './documentation/tabs-documentation/tabs-documentation.component';
import { DialogDocumentationComponent } from './documentation/dialog-documentation/dialog-documentation.component';
import { TagsDocumentationComponent } from './documentation/tags-documentation/tags-documentation.component';
import { RingLoaderDocumentationComponent } from './documentation/ring-loader-documentation/ring-loader-documentation.component';
import { StepCounterDocumentationComponent } from './documentation/step-counter-documentation/step-counter-documentation.component';
import { FormStatusOutletDocumentationComponent } from './documentation/form-status-outlet-documentation/form-status-outlet-documentation.component';
import { MarkedPipeModule } from '../../pipes/marked.pipe';
import { ComboBoxDocumentationComponent } from './documentation/combo-box-documentation/combo-box-documentation.component';
import { DropdownDocumentationComponent } from './documentation/dropdown-documentation/dropdown-documentation.component';
import { TextBoxDocumentationComponent } from './documentation/text-box-documentation/text-box-documentation.component';
import { InputDocumentationComponent } from './documentation/input/input-documentation.component';

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
    name: 'combo-box',
    comp: ComboBoxDocumentationComponent
  },
  {
    name: 'dialog',
    comp: DialogDocumentationComponent
  },
  {
    name: 'dropdown',
    comp: DropdownDocumentationComponent
  },
  {
    name: 'input',
    comp: InputDocumentationComponent
  },
  {
    name: 'form-status-outlet',
    comp: FormStatusOutletDocumentationComponent
  },
  {
    name: 'ring-loader',
    comp: RingLoaderDocumentationComponent
  },
  {
    name: 'step-counter',
    comp: StepCounterDocumentationComponent
  },
  {
    name: 'tabs',
    comp: TabsDocumentationComponent
  },
  {
    name: 'tags',
    comp: TagsDocumentationComponent
  },
  {
    name: 'text-box',
    comp: TextBoxDocumentationComponent
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
    ComboBoxDocumentationComponent,
    DropdownDocumentationComponent,
    TogglesDocumentationComponent,
    InputDocumentationComponent,
    BaseDocumentationCardComponent,
    TabsDocumentationComponent,
    DialogDocumentationComponent,
    TagsDocumentationComponent,
    RingLoaderDocumentationComponent,
    StepCounterDocumentationComponent,
    FormStatusOutletDocumentationComponent,
    TextBoxDocumentationComponent
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
    AppGuideCardModule,
    FormsModule,
    SelectionModule,
    PdsStepCounterModule,
    PdsFormStatusModule,
    MarkedPipeModule
  ]
})
export class AppComponentsPageModule {
}
