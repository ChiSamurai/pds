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
import { Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { PDS_PAGE_ENCAPSULATION } from './page-encapsulation';
import { PDS_PAGE_FOOTER_POSITION, PdsPageFooter, PageFooterPosition } from './page-footer';
import { PdsPageHeader } from './page-header';

@Component({
  selector: 'pds-page-layout',
  styleUrls: ['./page-layout.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #footerTemplate>
      <ng-container *ngIf="!!footer; else defaultFooterTemplate">
        <ng-content select="pds-page-footer"></ng-content>
      </ng-container>
      <ng-template #defaultFooterTemplate>
        <pds-page-footer></pds-page-footer>
      </ng-template>
    </ng-template>
    <ng-template #headerTemplate>
      <ng-container *ngIf="!!header; else defaultHeaderTemplate">
        <ng-content select="pds-page-header"></ng-content>
      </ng-container>
      <ng-template #defaultHeaderTemplate>
        <pds-page-header></pds-page-header>
      </ng-template>
    </ng-template>
    <ng-template #ngContentTemplate>
      <ng-content select="pds-page-content"></ng-content>
    </ng-template>

    <ng-container *ngIf="!!header; else headerTemplate">
      <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
    </ng-container>
    <main cdkScrollable>
      <ng-container *encapsulate="encapsulation; ngClass: 'pds-page-content'">
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
export class PdsPageLayout implements OnChanges, OnInit, OnDestroy {
  @ViewChild(CdkScrollable) private _mainScrollable: CdkScrollable;

  protected readonly ngDestroys = new Subject();

  @ContentChild(PdsPageHeader, { static: true }) private _staticHeader: PdsPageHeader;
  @ContentChild(PdsPageHeader, { static: false }) private _dynamicHeader: PdsPageHeader;
  @ContentChild(PdsPageFooter, { static: true }) private _staticFooter: PdsPageFooter;
  @ContentChild(PdsPageFooter, { static: false }) private _dynamicFooter: PdsPageFooter;

  get header(): PdsPageHeader | null {
    return this._dynamicHeader || this._staticHeader;
  }
  get footer(): PdsPageFooter | null {
    return this._dynamicFooter || this._staticFooter;
  }

  @Input() encapsulation: string;
  @Input() footerPosition: PageFooterPosition;

  constructor(
    @Inject(PDS_PAGE_FOOTER_POSITION) footerPosition: /* @dynamic */ PageFooterPosition,
    @Inject(PDS_PAGE_ENCAPSULATION) encapsulation: /* @dynamic */ string,
    @Optional() protected router?: Router
  ) {
    if (encapsulation) this.encapsulation = encapsulation;
    if (this.footerPosition == null) this.footerPosition = footerPosition;
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
      this.router.events
        .pipe(
          takeUntil(this.ngDestroys),
          filter((e) => e instanceof Scroll)
        )
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
    this.ngDestroys.next();
    this.ngDestroys.complete();
  }
}
