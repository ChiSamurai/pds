import { NgModule } from '@angular/core';
import { PdsTooltip } from './tooltip';
import { PdsTooltipDef } from './tooltip-def';
import { PdsTooltipOutlet } from './tooltip-outlet';

const declarations = [PdsTooltipOutlet, PdsTooltipDef, PdsTooltip];

@NgModule({
  declarations,
  exports: declarations,
})
export class PdsTooltipModule {}
