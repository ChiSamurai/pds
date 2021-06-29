import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBaseModule } from '@vitagroup/cdk';
import { TemplateOutletModule } from '@vitagroup/common';
import { PdsNav } from './nav';
import { PdsNavEntryLink } from './nav-entry-link';

const declarations = [PdsNav, PdsNavEntryLink];

@NgModule({
  declarations,
  exports: [NavBaseModule, ...declarations],
  imports: [NavBaseModule, CommonModule, RouterModule, TemplateOutletModule],
})
export class PdsNavModule {}
