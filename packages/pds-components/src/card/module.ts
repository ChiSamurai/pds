import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PdsCard } from './card';
import { PdsCardContent, PdsCardFooter, PdsCardHeader } from './card-content';

const declarations = [PdsCardHeader, PdsCardContent, PdsCardFooter, PdsCard];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class PdsCardModule {}
