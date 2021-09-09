import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LoadingStateModule, SvgIconModule, ThemeModule } from '@vitagroup/cdk';
import { FORM_ERROR_MESSAGES, FormErrorMessages } from '@vitagroup/cdk/forms';
import {
  FlexContainer,
  FlexContainerModule,
  TEMPLATE_ENCAPSULATIONS,
  TemplateEncapsulation,
} from '@vitagroup/cdk/layout';
import { ClipPipeModule, RouteDataPipeModule, RouterLinkOrHrefModule, TemplateOutletModule } from '@vitagroup/common';
import {
  PdsBannerModule,
  PdsBreadcrumbsModule,
  PdsChipModule,
  PdsDividerModule,
  PdsDropdownModule,
  PdsFormStatusModule,
  PdsInputDropdownModule,
  PdsNavModule,
  PdsRingLoader,
  PdsSelectListModule,
  PdsTextBoxModule,
  PdsToasterModule,
  PdsToggleBoxModule,
  PdsTooltipModule,
} from '@vitagroup/pds-components';
import { PdsPageLayoutModule } from '@vitagroup/pds-components/layout';

import { AppComponent } from './app.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppSearchComponent } from './components/app-search/app-search.component';
import { APP_BREADCRUMB_TITLE_SELECTOR_PROVIDER } from './config/app-breadcrumbs';
import { APP_DOCS_INIT_PROVIDER } from './config/app-docs';
import { APP_ICON_IMPORT_PROVIDER } from './config/app-icons';
import { APP_NAV_ENTRY_PROVIDER, APP_SECONDARY_NAV_ENTRY_PROVIDER } from './config/app-navigation';
import {
  APP_PAGE_ENCAPSULATION_PROVIDER,
  APP_PAGE_FOOTER_POSITION_PROVIDER,
  APP_PAGE_FOOTER_PROVIDER,
  APP_PAGE_HEADER_PROVIDER,
} from './config/app-page-layout';
import { APP_ROUTES } from './config/app-routes';
import { APP_SITEMAP_PROVIDER } from './config/app-sitemap';
import { MarkedPipeModule } from './pipes/marked.pipe';

@NgModule({
  declarations: [AppComponent, AppFooterComponent, AppHeaderComponent, AppSearchComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    ThemeModule.forRoot({
      themes: ['dark'],
    }),
    LoadingStateModule.forRoot({
      indicator: PdsRingLoader,
      overlayStrategy: 'onRouterEvent',
    }),
    FlexContainerModule.forRoot({
      default: { maxWidth: 1270, padding: 42 },
    }),
    HttpClientModule,
    ReactiveFormsModule,
    TemplateOutletModule,
    SvgIconModule,
    RouteDataPipeModule,
    PdsPageLayoutModule,
    PdsNavModule,
    PdsTextBoxModule,
    PdsChipModule,
    PdsToggleBoxModule,
    PdsFormStatusModule.forRoot(),
    PdsDividerModule,
    PdsBreadcrumbsModule,
    PdsToasterModule.forRoot(),
    PdsBannerModule,
    MarkedPipeModule,
    PdsDropdownModule,
    PdsInputDropdownModule,
    PdsSelectListModule,
    ClipPipeModule,
    RouterLinkOrHrefModule,
    FlexModule,
    PdsTooltipModule,
  ],
  providers: [
    {
      // todo(@janunld): move this to a proper reusable definition, maybe a module?
      provide: TEMPLATE_ENCAPSULATIONS,
      useValue: { name: 'fx-container', container: FlexContainer } as TemplateEncapsulation,
      multi: true,
    },
    {
      provide: FORM_ERROR_MESSAGES,
      useValue: {
        required: $localize`The field requires a value!`,
      } as FormErrorMessages,
    },

    APP_NAV_ENTRY_PROVIDER,
    APP_SECONDARY_NAV_ENTRY_PROVIDER,
    APP_SITEMAP_PROVIDER,
    APP_BREADCRUMB_TITLE_SELECTOR_PROVIDER,
    APP_PAGE_HEADER_PROVIDER,
    APP_PAGE_FOOTER_PROVIDER,
    APP_PAGE_FOOTER_POSITION_PROVIDER,
    APP_PAGE_ENCAPSULATION_PROVIDER,
    APP_ICON_IMPORT_PROVIDER,
    APP_DOCS_INIT_PROVIDER,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
