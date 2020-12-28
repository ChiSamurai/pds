import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SvgIconModule } from '@vitagroup/cdk';
import {
  FlexContainer,
  FlexContainerModule,
  PageLayoutModule,
  TEMPLATE_ENCAPSULATIONS,
  TemplateEncapsulation,
} from '@vitagroup/cdk/layout';
import { RouteDataPipeModule, TemplateOutletModule } from '@vitagroup/common';
import { MainMenuModule } from '@vitagroup/pds-components';
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

@NgModule({
  declarations: [AppComponent, AppFooterComponent, AppHeaderComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    FlexContainerModule.forRoot({
      default: { maxWidth: 1024, padding: 32 },
    }),
    MainMenuModule,
    TemplateOutletModule,
    PageLayoutModule,
    SvgIconModule,
    RouteDataPipeModule,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
