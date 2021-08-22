import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PdsBreadcrumbDef } from './breadcrumb-def';
import { PdsBreadcrumbDivider } from './breadcrumb-divider';
import { PdsBreadcrumbs } from './breadcrumbs';

const declarations = [PdsBreadcrumbs, PdsBreadcrumbDef, PdsBreadcrumbDivider];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule, RouterModule],
})
export class PdsBreadcrumbsModule {}
