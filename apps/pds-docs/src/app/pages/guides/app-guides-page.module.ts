import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { SvgIconModule } from '@vitagroup/cdk';
import { PageLayoutModule } from '@vitagroup/cdk/layout';
import { RouteDataPipeModule } from '@vitagroup/common';
import { CardModule } from '@vitagroup/pds-components';
import { MarkedPipeModule } from '../../pipes/marked.pipe';
import { AppGuidePageComponent } from './app-guide-page.component';
import { AppGuideResolve } from './app-guide.resolve';
import { AppGuidesPageComponent } from './app-guides-page.component';

export const APP_GUIDES_PAGE_ROUTES: Routes = [
  {
    path: '',
    component: AppGuidesPageComponent,
    data: {
      title: $localize`Guides`,
    },
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
    PageLayoutModule,
    MarkedPipeModule,
    FlexModule,
    CommonModule,
    CardModule,
    RouteDataPipeModule,
    SvgIconModule,
  ],
  providers: [AppGuideResolve],
})
export class AppGuidesPageModule {}
