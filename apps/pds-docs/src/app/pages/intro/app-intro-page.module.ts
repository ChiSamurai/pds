import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { SvgIconModule } from '@vitagroup/cdk';
import { PageLayoutModule } from '@vitagroup/cdk/layout';
import { RouterLinkOrHrefModule } from '@vitagroup/common';
import {
  CardModule,
  ComboBoxModule,
  SelectBoxModule,
  SelectListModule,
  TagModule,
  TextBoxModule,
} from '@vitagroup/pds-components';
import { AppGuideCardModule } from '../../components/app-guide-card/app-guide-card.component';
import { MarkedPipeModule } from '../../pipes/marked.pipe';
import { AppIntroPageComponent } from './app-intro-page.component';

export const APP_INTRO_PAGE_ROUTES: Routes = [
  {
    path: '',
    component: AppIntroPageComponent,
    data: {
      title: $localize`Introduction`,
    },
  },
];

@NgModule({
  exports: [AppIntroPageComponent],
  declarations: [AppIntroPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(APP_INTRO_PAGE_ROUTES),
    PageLayoutModule,
    FlexLayoutModule,
    SelectBoxModule,
    SelectListModule,
    TagModule,
    SvgIconModule,
    CardModule,
    RouterLinkOrHrefModule,
    MarkedPipeModule,
    AppGuideCardModule,
  ],
})
export class AppIntroPageModule {}
