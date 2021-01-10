import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LoadingStateModule, NavigationModule, SvgIconModule } from '@vitagroup/cdk';
import {
  FlexContainer,
  FlexContainerModule,
  PageLayoutModule,
  TEMPLATE_ENCAPSULATIONS,
  TemplateEncapsulation,
} from '@vitagroup/cdk/layout';
import { RouteDataPipeModule, TemplateOutletModule } from '@vitagroup/common';
import { MainMenuModule, RingLoader, TagModule, TextBoxModule } from '@vitagroup/pds-components';
import { APP_ICON_IMPORT_PROVIDER } from './app-icon-provider';
import { APP_NAV_ENTRY_PROVIDER, APP_STATIC_NAV_ENTRY_PROVIDER } from './app-navigation-provider';
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
      indicator: RingLoader,
      overlayStrategy: 'onRouterEvent',
    }),
    FlexContainerModule.forRoot({
      default: { maxWidth: 1024, padding: 32 },
    }),
    HttpClientModule,
    MainMenuModule,
    TemplateOutletModule,
    PageLayoutModule,
    SvgIconModule,
    RouteDataPipeModule,
    NavigationModule,
    TextBoxModule,
    TagModule,
  ],
  providers: [
    {
      // todo(@janunld): move this to a proper reusable definition, maybe a module?
      provide: TEMPLATE_ENCAPSULATIONS,
      useValue: { name: 'fx-container', container: FlexContainer } as TemplateEncapsulation,
      multi: true,
    },
    APP_NAV_ENTRY_PROVIDER,
    APP_STATIC_NAV_ENTRY_PROVIDER,
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
