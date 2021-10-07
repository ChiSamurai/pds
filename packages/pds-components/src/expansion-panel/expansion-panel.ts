import { Component, ViewEncapsulation } from '@angular/core';
import { ExpansionPanelBase } from '@vitagroup/cdk';

@Component({
  selector: 'pds-expansion-panel',
  styleUrls: ['expansion-panel.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: ExpansionPanelBase, useExisting: PdsExpansionPanel }],
  template: `
    <div class="pds-expansion-panel-header-container" tabindex="0" (click)="toggle()" (keyup.enter)="toggle()">
      <ng-content select="pds-expansion-panel-header"></ng-content>
      <svg-icon
        class="pds-expansion-panel-toggle"
        [name]="'pds-expansion-panel-' + (isExpanded ? 'collapse-toggle' : 'expand-toggle')"
        viewBox="0 0 18 18"
      >
        <ng-container *ngIf="isExpanded; else expandTogglePath">
          <svg:path
            d="M14.8,13.1c-0.3,0-0.6-0.1-0.8-0.3l-5-5l-5,5c-0.5,0.5-1.2,0.5-1.6,0c-0.5-0.5-0.5-1.2,0-1.6l5.8-5.8c0.5-0.5,1.2-0.5,1.6,0l5.8,5.8c0.5,0.5,0.5,1.2,0,1.6C15.4,13,15.1,13.1,14.8,13.1z"
          />
        </ng-container>
        <ng-template #expandTogglePath>
          <svg:path
            d="M9,13.1c-0.3,0-0.6-0.1-0.8-0.3L2.3,6.9c-0.5-0.5-0.5-1.2,0-1.6c0.5-0.5,1.2-0.5,1.6,0l5,5l5-5c0.5-0.5,1.2-0.5,1.6,0c0.5,0.5,0.5,1.2,0,1.6l-5.8,5.8C9.6,13,9.3,13.1,9,13.1z"
          />
        </ng-template>
      </svg-icon>
    </div>
    <div class="pds-expansion-panel-content-container" *ngIf="changes | async">
      <ng-content select="pds-expansion-panel-content"></ng-content>
      <ng-content></ng-content>
    </div>
  `,
})
export class PdsExpansionPanel extends ExpansionPanelBase {}
