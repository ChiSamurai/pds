import { Provider } from '@angular/core';
import {
  PDS_PAGE_ENCAPSULATION,
  PDS_PAGE_FOOTER_COMPONENT,
  PDS_PAGE_FOOTER_POSITION,
  PDS_PAGE_HEADER_COMPONENT
} from '@vitagroup/pds-components/layout';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';

export const APP_PAGE_HEADER_PROVIDER: Provider = {
  provide: PDS_PAGE_HEADER_COMPONENT,
  useValue: AppHeaderComponent,
};

export const APP_PAGE_FOOTER_POSITION_PROVIDER: Provider = {
  provide: PDS_PAGE_FOOTER_POSITION,
  useValue: 'fluid',
};

export const APP_PAGE_FOOTER_PROVIDER: Provider = {
  provide: PDS_PAGE_FOOTER_COMPONENT,
  useValue: AppFooterComponent,
};

export const APP_PAGE_ENCAPSULATION_PROVIDER: Provider = {
  provide: PDS_PAGE_ENCAPSULATION,
  useValue: 'fx-container',
};
