import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { SvgIconModule } from '@vitagroup/cdk';
import { RouterLinkOrHrefModule } from '@vitagroup/common';
import { PdsCardModule, PdsSelectBoxModule, PdsSelectListModule, PdsChipModule } from '@vitagroup/pds-components';
import { PdsPageLayoutModule } from '@vitagroup/pds-components/layout';
import { AppGuideCardModule } from '../../components/app-guide-card/app-guide-card.component';
import { MarkedPipeModule } from '../../pipes/marked.pipe';
import { AppIntroPageComponent } from './app-intro-page.component';

export const APP_INTRO_PAGE_ROUTES: Routes = [
  {
    path: '',
    component: AppIntroPageComponent,
  },
];

@NgModule({
  exports: [AppIntroPageComponent],
  declarations: [AppIntroPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(APP_INTRO_PAGE_ROUTES),
    FlexLayoutModule,
    PdsSelectBoxModule,
    PdsSelectListModule,
    PdsChipModule,
    SvgIconModule,
    PdsCardModule,
    RouterLinkOrHrefModule,
    MarkedPipeModule,
    AppGuideCardModule,
    PdsPageLayoutModule,
  ],
})
export class AppIntroPageModule {}
