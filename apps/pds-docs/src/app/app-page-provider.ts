import { Provider } from '@angular/core';
import {
  PAGE_ENCAPSULATION,
  PAGE_FOOTER_COMPONENT,
  PAGE_FOOTER_POSITION,
  PAGE_HEADER_COMPONENT,
} from '@vitagroup/cdk/layout';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';

export const APP_PAGE_HEADER_PROVIDER: Provider = {
  provide: PAGE_HEADER_COMPONENT,
  useValue: AppHeaderComponent,
};

export const APP_PAGE_FOOTER_POSITION_PROVIDER: Provider = {
  provide: PAGE_FOOTER_POSITION,
  useValue: 'fluid',
};

export const APP_PAGE_FOOTER_PROVIDER: Provider = {
  provide: PAGE_FOOTER_COMPONENT,
  useValue: AppFooterComponent,
};

export const APP_PAGE_ENCAPSULATION_PROVIDER: Provider = {
  provide: PAGE_ENCAPSULATION,
  useValue: 'fx-container',
};
