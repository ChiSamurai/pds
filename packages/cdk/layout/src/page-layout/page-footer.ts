import { Component, Inject, InjectionToken, Input, Optional, Type, ViewEncapsulation } from '@angular/core';
import { PAGE_ENCAPSULATION } from './page-encapsulation';

export type PageFooterPosition = 'fixed' | 'fluid' | 'none';

export const PAGE_FOOTER_COMPONENT = new InjectionToken<Type<any>>('PAGE_FOOTER_COMPONENT');
export const PAGE_FOOTER_POSITION = new InjectionToken<PageFooterPosition>('PAGE_FOOTER_POSITION', {
  providedIn: 'root',
  factory: /* @dynamic */ () => 'none',
});

@Component({
  selector: 'page-footer',
  styleUrls: ['./page-footer.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #ngContentTemplate>
      <ng-content></ng-content>
    </ng-template>
    <ng-template #defaultComponentOrContentTemplate>
      <ng-container *ngIf="component != null; else ngContentTemplate">
        <ng-container *ngComponentOutlet="component"></ng-container>
      </ng-container>
    </ng-template>

    <ng-container *encapsulate="encapsulation">
      <ng-container *ngTemplateOutlet="defaultComponentOrContentTemplate"></ng-container>
    </ng-container>
  `,
})
export class PageFooter {
  @Input() encapsulation: string;

  constructor(
    @Optional() @Inject(PAGE_ENCAPSULATION) encapsulation?: /* @dynamic */ string,
    @Optional() @Inject(PAGE_FOOTER_COMPONENT) readonly component?: Type<any>
  ) {
    if (encapsulation) this.encapsulation = encapsulation;
  }
}
