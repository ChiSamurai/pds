import { AfterContentInit, Component, Input, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    <pds-card>
      <pds-card-header>
        <h3>{{heading}}</h3>
      </pds-card-header>
      <pds-card-content>
        {{activeTab}}
        <div fxLayout="column" [id]="heading | lowercase">
          <pds-tabs>
            <pds-tab *ngFor="let tab of documentationTabs"
                     [ngClass]="{'active': activeTab === tab.id}"
                     [routerLink]=""
                     [fragment]="tab.id">
              {{tab.id | uppercase}}
            </pds-tab>
          </pds-tabs>
          <div class="container">
            <div *ngFor="let tab of documentationTabs"
                 [hidden]="activeTab !== tab.id">
              <ng-container [ngTemplateOutlet]="tab.content"></ng-container>
            </div>
          </div>
        </div>
      </pds-card-content>
    </pds-card>`
})
export class BaseDocumentationComponent implements AfterContentInit {
  @Input() heading: string;
  @Input() documentationTabs: IDocumentationTab[];

  @Input() activeTab: string;

  constructor(
    protected route: ActivatedRoute
  ) {
    route.fragment.subscribe(frag => {
      this.activeTab = frag ? frag : null;
    });
  }

  ngAfterContentInit() {
    if (!this.activeTab) {
      this.activeTab = this.documentationTabs.length > 0 && this.documentationTabs[0].id;
    }
  }
}
