import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LoadingStateModule, SvgIconModule } from '@vitagroup/cdk';
import { FORM_ERROR_MESSAGES, FormErrorMessages } from '@vitagroup/cdk/forms';
import {
  FlexContainer,
  FlexContainerModule,
  TEMPLATE_ENCAPSULATIONS,
  TemplateEncapsulation,
} from '@vitagroup/cdk/layout';
import { RouteDataPipeModule, TemplateOutletModule } from '@vitagroup/common';
import {
  PdsDividerModule,
  PdsFormStatusModule,
  PdsNavModule,
  PdsRingLoader,
  PdsChipModule,
  PdsTextBoxModule,
  PdsToggleBoxModule,
  PdsBreadcrumbsModule,
} from '@vitagroup/pds-components';
import { PdsPageLayoutModule } from '@vitagroup/pds-components/layout';
import { APP_ICON_IMPORT_PROVIDER } from './app-icon-provider';
import { APP_NAV_ENTRY_PROVIDER, APP_SECONDARY_NAV_ENTRY_PROVIDER } from './app-navigation-provider';
import {
  APP_PAGE_ENCAPSULATION_PROVIDER,
  APP_PAGE_FOOTER_POSITION_PROVIDER,
  APP_PAGE_FOOTER_PROVIDER,
  APP_PAGE_HEADER_PROVIDER,
} from './app-page-provider';
import { APP_ROUTES } from './app-routes';
import { APP_SITEMAP_PROVIDER } from './app-sitemap-provider';

import { AppComponent } from './app.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { APP_GUIDES_INIT_PROVIDER } from './services/app-guides.service';

@NgModule({
  declarations: [AppComponent, AppFooterComponent, AppHeaderComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    LoadingStateModule.forRoot({
      indicator: PdsRingLoader,
      overlayStrategy: 'onRouterEvent',
    }),
    FlexContainerModule.forRoot({
      default: { maxWidth: 1270, padding: 32 },
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
    APP_PAGE_HEADER_PROVIDER,
    APP_PAGE_FOOTER_PROVIDER,
    APP_PAGE_FOOTER_POSITION_PROVIDER,
    APP_PAGE_ENCAPSULATION_PROVIDER,
    APP_ICON_IMPORT_PROVIDER,

    APP_GUIDES_INIT_PROVIDER,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
