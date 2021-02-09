import { CdkScrollable } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PAGE_ENCAPSULATION } from './page-encapsulation';
import { PAGE_FOOTER_POSITION, PageFooter, PageFooterPosition } from './page-footer';
import { PageHeader } from './page-header';

@Component({
  selector: 'page-layout',
  styleUrls: ['./page-layout.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #footerTemplate>
      <ng-container *ngIf="footer != null; else defaultFooterTemplate">
        <ng-content select="page-footer"></ng-content>
      </ng-container>
      <ng-template #defaultFooterTemplate>
        <page-footer></page-footer>
      </ng-template>
    </ng-template>
    <ng-template #headerTemplate>
      <ng-container *ngIf="header != null; else defaultHeaderTemplate">
        <ng-content select="page-header"></ng-content>
      </ng-container>
      <ng-template #defaultHeaderTemplate>
        <page-header></page-header>
      </ng-template>
    </ng-template>
    <ng-template #ngContentTemplate>
      <ng-content select="page-content, [pageContent]"></ng-content>
      <ng-content></ng-content>
    </ng-template>

    <ng-container *ngIf="header != null; else headerTemplate">
      <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
    </ng-container>
    <main cdkScrollable>
      <ng-container *encapsulate="encapsulation; ngClass: 'page-content'">
        <ng-container *ngTemplateOutlet="ngContentTemplate"></ng-container>
      </ng-container>
      <ng-container *ngIf="footerPosition === 'fluid'">
        <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
      </ng-container>
    </main>
    <ng-container *ngIf="footerPosition === 'fixed'">
      <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
    </ng-container>
  `,
  inputs: ['footerPosition: footer'],
})
export class PageLayout implements OnChanges, OnInit, OnDestroy {
  private _routerScrollSubscription: Subscription | null;

  @ViewChild(CdkScrollable) private _mainScrollable: CdkScrollable;

  @ContentChild(PageHeader, { static: true }) private _staticHeader: PageHeader;
  @ContentChild(PageHeader, { static: false }) private _dynamicHeader: PageHeader;
  @ContentChild(PageFooter, { static: true }) private _staticFooter: PageFooter;
  @ContentChild(PageFooter, { static: false }) private _dynamicFooter: PageFooter;

  get header(): PageHeader {
    return this._dynamicHeader || this._staticHeader;
  }
  get footer(): PageFooter {
    return this._dynamicFooter || this._staticFooter;
  }

  @Input() encapsulation: string;

  @Input() footerPosition: PageFooterPosition;

  constructor(
    @Inject(PAGE_FOOTER_POSITION) footerPosition: /* @dynamic */ PageFooterPosition,
    @Inject(PAGE_ENCAPSULATION) encapsulation: /* @dynamic */ string,
    @Optional() protected router?: Router
  ) {
    if (encapsulation) this.encapsulation = encapsulation;
    this.footerPosition = footerPosition;
  }

  ngOnChanges(changes: SimpleChanges) {
    const { encapsulation } = changes;
    if (encapsulation && encapsulation.currentValue != null) {
      this.header.encapsulation = encapsulation.currentValue;
      this.footer.encapsulation = encapsulation.currentValue;
    }
  }
  ngOnInit() {
    if (this.router != null) {
      this._routerScrollSubscription = this.router.events
        .pipe(filter((e) => e instanceof Scroll))
        .subscribe((e: Scroll) => {
          // todo(@janunld): consider anchor scroll support? we should probably..
          let top = 0;
          let left = 0;
          if (e.position) {
            left = e.position[0];
            top = e.position[1];
          }
          this._mainScrollable.scrollTo({ left, top });
        });
    }
  }
  ngOnDestroy() {
    if (this._routerScrollSubscription != null && !this._routerScrollSubscription.closed)
      this._routerScrollSubscription.unsubscribe();
  }
}
