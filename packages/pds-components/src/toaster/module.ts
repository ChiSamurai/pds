import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  DEFAULT_TOAST_POSITION,
  SvgIconModule,
  TOAST_COMPONENT,
  TOAST_CONTAINER,
  ToasterModule,
  ToastPosition,
} from '@vitagroup/cdk';
import { PdsBannerModule } from '@vitagroup/pds-components';
import { PdsToast } from './toast';
import { PdsToastContainer } from './toast-container';

const declarations = [PdsToastContainer, PdsToast];

@NgModule({
  declarations,
  exports: [ToasterModule],
  imports: [CommonModule, PdsBannerModule, SvgIconModule, ToasterModule],
})
export class PdsToasterModule {
  static forRoot(): ModuleWithProviders<PdsToasterModule> {
    return {
      ngModule: PdsToasterModule,
      providers: [
        { provide: DEFAULT_TOAST_POSITION, useValue: ['right', 'top'] as ToastPosition },
        { provide: TOAST_CONTAINER, useValue: PdsToastContainer },
        { provide: TOAST_COMPONENT, useValue: PdsToast },
      ],
    };
  }
}
