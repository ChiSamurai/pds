import {
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  Optional,
  Renderer2,
  TemplateRef,
  Type,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { PreventNativeTitleTooltip } from '@vitagroup/cdk/a11y';
import { PAGE_ENCAPSULATION, PageEncapsulation } from './page-encapsulation';

export const PAGE_HEADER_COMPONENT = new InjectionToken<Type<any>>('PAGE_HEADER_COMPONENT');

@Component({
  selector: 'page-header',
  styleUrls: [ './page-header.scss' ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #ngContentTemplate>
      <ng-content></ng-content>
    </ng-template>
    <ng-template #defaultComponentOrContentTemplate>
      <ng-container *ngIf='component != null; else ngContentTemplate'>
        <ng-container *ngComponentOutlet='component'></ng-container>
      </ng-container>
    </ng-template>

    <ng-container *ngIf="encapsulation === 'fx-container'; else defaultComponentOrContentTemplate">
      <fx-container>
        <ng-container *ngTemplateOutlet='defaultComponentOrContentTemplate'></ng-container>
      </fx-container>
    </ng-container>`
})
export class PageHeader extends PreventNativeTitleTooltip {
  @ViewChild('ngContentTemplate', { static: true })
  readonly contentTemplate: TemplateRef<any>;

  @Input() encapsulation: PageEncapsulation;

  constructor(
    protected renderer: Renderer2,
    protected elementRef: ElementRef<HTMLElement>,
    @Inject(PAGE_ENCAPSULATION) encapsulation: /* @dynamic */ PageEncapsulation,
    @Optional() @Inject(PAGE_HEADER_COMPONENT) readonly component: Type<any>
  ) {
    super(elementRef, renderer);
    this.encapsulation = encapsulation;
  }
}
