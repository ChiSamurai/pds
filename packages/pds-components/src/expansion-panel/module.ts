import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgIconModule } from '@vitagroup/cdk';
import { PdsExpansionPanel } from './expansion-panel';
import { PdsExpansionPanelContent, PdsExpansionPanelHeader } from './expansion-panel-content';
import { PdsExpansionPanelGroup } from './expansion-panel-group';

const declarations = [PdsExpansionPanel, PdsExpansionPanelHeader, PdsExpansionPanelContent, PdsExpansionPanelGroup];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule, SvgIconModule],
})
export class PdsExpansionPanelModule {}
