import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { DialogOverlayModule, SelectionModule, SvgIconModule } from '@vitagroup/cdk';
import { RouteDataPipeModule, RouteParamPipeModule, RouterLinkOrHrefModule } from '@vitagroup/common';
import { PdsChipModule, PdsDividerModule, PdsTabsModule } from '@vitagroup/pds-components';
import { PdsPageLayoutModule } from '@vitagroup/pds-components/layout';
import { AppGuideCardModule } from '../../components/app-doc-card/app-doc-card.component';
import { HighlightJsPipeModule } from '../../pipes/highlightjs.pipe';
import { MarkedPipeModule } from '../../pipes/marked.pipe';
import { NgCompilePipeModule } from '../../pipes/ng-compile.pipe';
import { AppDocResolve } from '../../resolves/app-doc.resolve';
import { AppDocsResolve } from '../../resolves/app-docs.resolve';
import { AppExamplesResolve } from '../../resolves/app-examples.resolve';
import { AppDocContentPageComponent } from './[slug]/app-doc-content-page.component';
import { AppDocPageComponent } from './[slug]/app-doc-page.component';
import { AppDocExamplesPageComponent } from './[slug]/examples/app-doc-examples-page.component';
import { AppDocsPageComponent } from './app-docs-page.component';

export const APP_DOC_PAGE_ROUTES: Routes = [
  {
    path: '',
    component: AppDocsPageComponent,
    resolve: {
      docs: AppDocsResolve,
    },
  },
  {
    path: 'chapters/:chapter/:slug',
    component: AppDocPageComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    children: [
      {
        path: '',
        component: AppDocContentPageComponent,
        resolve: {
          doc: AppDocResolve,
        },
      },
      {
        path: 'examples',
        component: AppDocExamplesPageComponent,
        resolve: {
          examples: AppExamplesResolve,
        },
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '',
      },
    ],
  },
  {
    path: 'chapters/:chapter',
    component: AppDocsPageComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      docs: AppDocsResolve,
    },
  },
  {
    path: ':slug',
    component: AppDocPageComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    children: [
      {
        path: '',
        component: AppDocContentPageComponent,
        resolve: {
          doc: AppDocResolve,
        },
      },
      {
        path: 'examples',
        component: AppDocExamplesPageComponent,
        resolve: {
          examples: AppExamplesResolve,
        },
        data: {
          breadcrumb: false,
        },
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  declarations: [AppDocsPageComponent, AppDocPageComponent, AppDocContentPageComponent, AppDocExamplesPageComponent],
  providers: [AppDocsResolve, AppDocResolve, AppExamplesResolve],
  imports: [
    DialogOverlayModule,
    RouterModule.forChild(APP_DOC_PAGE_ROUTES),
    FlexLayoutModule,
    CommonModule,
    PdsTabsModule,
    PdsPageLayoutModule,
    RouteDataPipeModule,
    MarkedPipeModule,
    RouterLinkOrHrefModule,
    AppGuideCardModule,
    PdsDividerModule,
    NgCompilePipeModule,
    HighlightJsPipeModule,
    ClipboardModule,
    SelectionModule,
    SvgIconModule,
    PdsChipModule,
    RouteParamPipeModule,
  ],
})
export class AppDocsPageModule {}
