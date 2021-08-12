import {
  AfterContentInit,
  Component,
  Input,
  TemplateRef
} from '@angular/core';

export enum DEFAULT_DOCUMENTATION_TABS {
  OVERVIEW = 'overview',
  API = 'api',
  EXAMPLES = 'examples'
}

export interface IDocumentationTab {
  id: string,
  content: TemplateRef<never>
}

@Component({
  selector: 'pds-app-base-documentation-component',
  template: `
    <div fxLayout="column">
      <h3 fxFlex="100">{{heading}}</h3>
      <pds-tabs>
        <pds-tab *ngFor="let tab of documentationTabs"
                 [ngClass]="{'active': activeTab === tab.id}"
                 (click)="activeTab = tab.id">
          {{tab.id | uppercase}}
        </pds-tab>
      </pds-tabs>
      <div class="container">
        <div *ngFor="let tab of documentationTabs"
             [hidden]="activeTab !== tab.id">
          <ng-container [ngTemplateOutlet]="tab.content"></ng-container>
        </div>
      </div>
    </div>`
})
export class BaseDocumentationComponent implements AfterContentInit {
  @Input() heading: string;
  @Input() documentationTabs: IDocumentationTab[];

  @Input() activeTab: string;

  ngAfterContentInit() {
    this.activeTab = this.documentationTabs.length > 0 && this.documentationTabs[0].id;
  }
}
