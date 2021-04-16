import { InjectionToken, Type } from '@angular/core';

export interface TemplateEncapsulation {
  readonly name: string;
  container: Type<any>;
}

export const TEMPLATE_ENCAPSULATIONS = new InjectionToken<TemplateEncapsulation>('TEMPLATE_ENCAPSULATIONS');
