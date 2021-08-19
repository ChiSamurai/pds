import { NgModule } from '@angular/core';
import { PdsChip } from './chip';

const declarations = [PdsChip];

@NgModule({
  declarations,
  exports: declarations,
})
export class PdsChipModule {}
