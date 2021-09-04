import { NgCompileOptions } from '../pipes/ng-compile.pipe';

export interface AppExample extends NgCompileOptions {
  /** Gets or sets the title of the example */
  title: string;
  /** Gets or sets template url relative to the {@link APP_EXAMPLES_BASE_URL} token value  */
  templateUrl: string;
  /** Gets or sets a typescript source file url pointing to any available context */
  contextUrl?: string;
}

export interface AppExampleWithTemplate extends AppExample {
  /** Gets or sets the template source string */
  template: string;
  /** Gets or sets the context source string */
  contextSource?: string;
}
