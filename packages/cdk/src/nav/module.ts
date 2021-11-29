import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StringInterpolatePipeModule } from '@vitagroup/common';
import { NavEntryDef } from './nav-entry-def';
import { NavEntryLink } from './nav-entry-link';
import { NavEntryOutlet } from './nav-entry-outlet';

const declarations = [NavEntryDef, NavEntryOutlet, NavEntryLink];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule, StringInterpolatePipeModule],
})
export class NavBaseModule {}
