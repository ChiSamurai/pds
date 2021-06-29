import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SvgIconModule } from '@vitagroup/cdk';
import { FORM_ERROR_COMPONENT, FORM_PENDING_COMPONENT, FORM_VALID_COMPONENT } from '@vitagroup/cdk/forms';
import { PdsRingLoaderModule } from '../ring-loader/module';
import { PdsFormStatus } from './form-status';

const declarations = [PdsFormStatus];

@NgModule({
  declarations,
  exports: declarations,
  imports: [SvgIconModule, CommonModule, PdsRingLoaderModule],
})
export class PdsFormStatusModule {
  static forRoot(): ModuleWithProviders<PdsFormStatusModule> {
    return {
      ngModule: PdsFormStatusModule,
      providers: [
        {
          provide: FORM_ERROR_COMPONENT,
          useValue: PdsFormStatus,
        },
        {
          provide: FORM_PENDING_COMPONENT,
          useValue: PdsFormStatus,
        },
        {
          provide: FORM_VALID_COMPONENT,
          useValue: PdsFormStatus,
        },
      ],
    };
  }
}
