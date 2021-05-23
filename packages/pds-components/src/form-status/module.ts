import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SvgIconModule } from '@vitagroup/cdk';
import { FORM_ERROR_COMPONENT, FORM_PENDING_COMPONENT, FORM_VALID_COMPONENT } from '@vitagroup/cdk/forms';
import { RingLoaderModule } from '../ring-loader/module';
import { FormStatus } from './form-status';

const declarations = [FormStatus];

@NgModule({
  declarations,
  exports: declarations,
  imports: [SvgIconModule, CommonModule, RingLoaderModule],
})
export class FormStatusModule {
  static forRoot(): ModuleWithProviders<FormStatusModule> {
    return {
      ngModule: FormStatusModule,
      providers: [
        {
          provide: FORM_ERROR_COMPONENT,
          useValue: FormStatus,
        },
        {
          provide: FORM_PENDING_COMPONENT,
          useValue: FormStatus,
        },
        {
          provide: FORM_VALID_COMPONENT,
          useValue: FormStatus,
        },
      ],
    };
  }
}
