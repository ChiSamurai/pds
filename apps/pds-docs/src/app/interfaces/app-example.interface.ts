import { NgCompileOptions } from '../pipes/ng-compile.pipe';

export interface AppExample extends NgCompileOptions {
  /** Gets or sets the title of the example */
  title: string;
  /** Gets or sets template url relative to the {@link APP_EXAMPLES_BASE_URL} token value  */
  templateUrl: string;
}

export interface AppExampleWithTemplate extends AppExample {
  /** Gets or sets the template source string */
  template: string;
}
