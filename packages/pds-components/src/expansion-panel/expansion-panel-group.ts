import { Component, ViewEncapsulation } from '@angular/core';
import { ExpansionPanelGroupBase } from '@vitagroup/cdk';

@Component({
  selector: 'pds-expansion-panel-group',
  styles: ['pds-expansion-panel-group { display: block; width: 100% }'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>
  `,
})
export class PdsExpansionPanelGroup extends ExpansionPanelGroupBase {}
