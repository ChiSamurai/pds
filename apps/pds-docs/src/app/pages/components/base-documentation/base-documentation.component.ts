import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable, Subscription } from 'rxjs';
import { AppGuide } from '../../../interfaces/app-guide.interface';
import { AppGuidesService } from '../../../services/app-guides.service';

export enum DEFAULT_DOCUMENTATION_TABS {
  OVERVIEW = 'overview',
  API = 'api',
  EXAMPLES = 'examples'
}

export enum HTML_ELEMENT_STATES {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
  ACTIVE = 'active',
  HOVER = 'hover',
  FOCUS = 'focus'
}

export enum HTML_ELEMENT_SEMANTICS {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

export interface IDocumentationTab {
  id: string,
  content: TemplateRef<never>
}

@Component({
  selector: 'pds-app-base-documentation-component',
  templateUrl: './base-documentation.component.html'
})
export class BaseDocumentationComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {
  @ViewChild('guideTemplate') guideTemplateRef: TemplateRef<never>;

  @Input() heading: string;
  @Input() id: string;
  @Input() documentationTabs: IDocumentationTab[];

  @Input() activeTab: string;
  @Input() inline = true;
  guide$: Observable<AppGuide>;
  private subscriptions: Subscription[] = [];

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected guidesService: AppGuidesService,
    protected changeDetectorRef: ChangeDetectorRef
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

  ngAfterViewInit() {
    if (!this.documentationTabs.find(tab => tab.id === 'examples')) {
      this.guide$ = from(this.guidesService.resolve(this.id));
      this.documentationTabs.push({
        id: 'examples',
        content: this.guideTemplateRef
      });
      this.changeDetectorRef.detectChanges();
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
