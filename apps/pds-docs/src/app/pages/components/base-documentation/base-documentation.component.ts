import { AfterContentInit, Component, Input, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
        <div fxLayout="column" [id]="heading | lowercase">
          <pds-tabs>
            <pds-tab *ngFor="let tab of documentationTabs"
                     [ngClass]="{'active': activeTab === tab.id}"
                     (click)="onTabClick(tab)">
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
    protected route: ActivatedRoute,
    protected router: Router
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

  async onTabClick(tab: IDocumentationTab) {
    if (this.route.snapshot.url.length > 0) {
      await this.router.navigate(['./'], {fragment: tab.id, relativeTo: this.route});
    } else {
      this.activeTab = tab.id;
    }
  }
}
