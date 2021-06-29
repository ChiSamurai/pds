import { NgModule } from '@angular/core';
import { PdsTab } from './tab';
import { PdsTabs } from './tabs';

const declarations = [PdsTabs, PdsTab];

@NgModule({
  declarations,
  exports: declarations,
})
export class PdsTabsModule {}
