import { AbstractControl } from '@angular/forms';

export type FormSchemaMap<S, V> = {
  [P in keyof S]?: V;
};

export type FormSchemaControls<S> = FormSchemaMap<S, AbstractControl>;
