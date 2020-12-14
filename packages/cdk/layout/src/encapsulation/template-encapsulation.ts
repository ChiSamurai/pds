import { InjectionToken, TemplateRef, Type } from '@angular/core';

export interface TemplateEncapsulation {
  readonly name: string;
  container: TemplateRef<any> | Type<any>;
}

export const TEMPLATE_ENCAPSULATIONS = new InjectionToken<TemplateEncapsulation>('TEMPLATE_ENCAPSULATIONS');
