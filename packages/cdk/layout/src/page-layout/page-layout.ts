import {
  Component,
  ContentChild,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  Renderer2, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { PreventNativeTitleTooltip } from '@vitagroup/cdk/a11y';
import { PAGE_ENCAPSULATION, PageEncapsulation } from './page-encapsulation';
import { PAGE_FOOTER_POSITION, PageFooter, PageFooterPosition } from './page-footer';
import { PageHeader } from './page-header';

@Component({
  selector: 'page-layout',
  styleUrls: [ './page-layout.scss' ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #footerTemplate>
      <ng-container *ngIf='contentFooter != null; else defaultFooterTemplate'>
        <ng-content select='page-footer'></ng-content>
      </ng-container>
      <ng-template #defaultFooterTemplate>
        <page-footer></page-footer>
      </ng-template>
    </ng-template>
    <ng-template #headerTemplate>
      <ng-container *ngIf='contentHeader != null; else defaultHeaderTemplate'>
        <ng-content select='page-header'></ng-content>
      </ng-container>
      <ng-template #defaultHeaderTemplate>
        <page-header [title]='title' *ngIf='title != null'></page-header>
      </ng-template>
    </ng-template>
    <ng-template #ngContentTemplate>
      <ng-content select='page-content, [pageContent]'></ng-content>
      <ng-content></ng-content>
    </ng-template>

    <ng-container *ngIf='contentHeader != null; else headerTemplate'>
      <ng-container *ngTemplateOutlet='headerTemplate'></ng-container>
    </ng-container>
    <main #main>
      <ng-container *ngIf="encapsulation === 'fx-container'; else rawContentTemplate">
        <fx-container class='page-content' [preventScrollbarOffset]='main'>
          <ng-container *ngTemplateOutlet='ngContentTemplate'></ng-container>
        </fx-container>
      </ng-container>
      <ng-template #rawContentTemplate>
        <div class='page-content' [preventScrollbarOffset]='main'>
          <ng-container *ngTemplateOutlet='ngContentTemplate'></ng-container>
        </div>
      </ng-template>
      <ng-container *ngIf="footerPosition === 'fluid'">
        <ng-container *ngTemplateOutlet='footerTemplate'></ng-container>
      </ng-container>
    </main>
    <ng-container *ngIf="footerPosition === 'fixed'">
      <ng-container *ngTemplateOutlet='footerTemplate'></ng-container>
    </ng-container>`
})
export class PageLayout extends PreventNativeTitleTooltip implements OnChanges {
  @ContentChild(PageHeader, { static: true }) private _staticHeader: PageHeader;
  @ContentChild(PageHeader, { static: false }) private _dynamicHeader: PageHeader;
  @ContentChild(PageFooter, { static: true }) private _staticFooter: PageFooter;
  @ContentChild(PageFooter, { static: false }) private _dynamicFooter: PageFooter;

  get contentHeader(): PageHeader {
    return this._dynamicHeader || this._staticHeader;
  }
  get contentFooter(): PageFooter {
    return this._dynamicFooter || this._staticFooter;
  }

  @Input() title: string;
  @Input() encapsulation: PageEncapsulation;

  @Input('footer') footerPosition: PageFooterPosition;

  constructor(
    protected renderer: Renderer2,
    protected elementRef: ElementRef<HTMLElement>,
    @Inject(PAGE_FOOTER_POSITION) footerPosition: /* @dynamic */ PageFooterPosition,
    @Inject(PAGE_ENCAPSULATION) encapsulation: /* @dynamic */ PageEncapsulation
  ) {
    super(elementRef, renderer);
    this.footerPosition = footerPosition;
    this.encapsulation = encapsulation;
  }

  ngOnChanges(changes: SimpleChanges) {
    const { encapsulation } = changes;
    if (encapsulation && encapsulation.currentValue != null) {
      this.contentHeader.encapsulation = encapsulation.currentValue;
      this.contentFooter.encapsulation = encapsulation.currentValue;
    }
  }
}
