import { AfterContentInit, Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
    <pds-page-layout footer="fixed" *ngIf="!inline; else docTemplate">
      <pds-page-content fxLayout="row wrap" fxLayoutGap="32px grid">
        <section fxFlex="100">
          <ng-container [ngTemplateOutlet]="docTemplate"></ng-container>
        </section>
      </pds-page-content>
    </pds-page-layout>

    <ng-template #docTemplate>
      <pds-card>
        <pds-card-header>
          <h3 (click)="openComponentDoc()" [ngStyle]="{cursor: 'pointer'}">{{heading}}</h3>
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
      </pds-card>
    </ng-template>`
})
export class BaseDocumentationComponent implements OnInit, OnDestroy, AfterContentInit {
  @Input() heading: string;
  @Input() id: string;
  @Input() documentationTabs: IDocumentationTab[];

  @Input() activeTab: string;
  @Input() inline = true;

  private subscriptions: Subscription[] = [];

  constructor(
    protected route: ActivatedRoute,
    protected router: Router
  ) {
  }

  ngOnInit() {
    const fragmentSubscription = this.route.fragment.subscribe(frag => {
      this.activeTab = frag ? frag : null;
    });

    const routeDataSubscription = this.route.data.subscribe(data => {
      if (data.inline === false) {
        this.inline = false;
      }
    });

    this.subscriptions.push(fragmentSubscription, routeDataSubscription);
  }

  ngAfterContentInit() {
    if (!this.activeTab) {
      this.activeTab = this.documentationTabs.length > 0 && this.documentationTabs[0].id;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  async onTabClick(tab: IDocumentationTab) {
    if (this.route.snapshot.url.length > 0) {
      await this.router.navigate(['./'], {fragment: tab.id, relativeTo: this.route});
    } else {
      this.activeTab = tab.id;
    }
  }

  async openComponentDoc() {
    if (this.route.snapshot.url.length === 0) {
      await this.router.navigate([this.id], {relativeTo: this.route});
    }
  }
}
