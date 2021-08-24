import { NgCompileOptions } from '../pipes/ng-compile.pipe';

export interface AppExampleModuleDef {
  import: NgCompileOptions['imports'];
  for: RegExp;
}

export interface AppExample extends NgCompileOptions {
  /** Gets or sets the template source string */
  template: string;
}
