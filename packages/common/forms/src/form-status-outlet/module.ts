import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormStatusOutlet } from './form-status-outlet';
import { FormStatusPendingDef } from './form-status-pending-def';
import { FormStatusValidDef } from './form-status-valid-def';

const declarations = [FormStatusOutlet, FormStatusPendingDef, FormStatusValidDef];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class FormStatusOutletModule {}
