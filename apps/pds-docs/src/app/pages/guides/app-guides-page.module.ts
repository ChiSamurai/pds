import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { SvgIconModule } from '@vitagroup/cdk';
import { RouteDataPipeModule } from '@vitagroup/common';
import { PdsCardModule, PdsChipModule } from '@vitagroup/pds-components';
import { PdsPageLayoutModule } from '@vitagroup/pds-components/layout';
import { AppGuideCardModule } from '../../components/app-guide-card/app-guide-card.component';
import { MarkedPipeModule } from '../../pipes/marked.pipe';
import { AppGuidePageComponent } from './[slug]/app-guide-page.component';
import { AppGuideResolve } from '../../resolves/app-guide.resolve';
import { AppGuidesPageComponent } from './app-guides-page.component';

export const APP_GUIDES_PAGE_ROUTES: Routes = [
  {
    path: '',
    component: AppGuidesPageComponent,
  },
  {
    path: ':slug',
    component: AppGuidePageComponent,
    resolve: {
      guide: AppGuideResolve,
    },
  },
];

@NgModule({
  declarations: [AppGuidesPageComponent, AppGuidePageComponent],
  exports: [AppGuidesPageComponent, AppGuidesPageComponent],
  imports: [
    RouterModule.forChild(APP_GUIDES_PAGE_ROUTES),
    MarkedPipeModule,
    FlexModule,
    CommonModule,
    PdsCardModule,
    RouteDataPipeModule,
    SvgIconModule,
    AppGuideCardModule,
    PdsPageLayoutModule,
    PdsChipModule,
  ],
  providers: [AppGuideResolve],
})
export class AppGuidesPageModule {}
