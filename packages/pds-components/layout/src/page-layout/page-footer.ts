import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  InjectionToken,
  Input,
  Optional,
  Type,
  ViewEncapsulation,
} from '@angular/core';
import { PDS_PAGE_ENCAPSULATION } from './page-encapsulation';

export type PageFooterPosition = 'fixed' | 'fluid' | 'none';

export const PDS_PAGE_FOOTER_COMPONENT = new InjectionToken<Type<any>>('PDS_PAGE_FOOTER_COMPONENT');
export const PDS_PAGE_FOOTER_POSITION = new InjectionToken<PageFooterPosition>('PDS_PAGE_FOOTER_POSITION', {
  providedIn: 'root',
  factory: /* @dynamic */ () => 'none',
});

@Component({
  selector: 'pds-page-footer',
  styleUrls: ['./page-footer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #ngContentTemplate>
      <ng-content></ng-content>
    </ng-template>
    <ng-template #defaultComponentOrContentTemplate>
      <ng-container *ngIf="!!component; else ngContentTemplate">
        <ng-container *ngComponentOutlet="component"></ng-container>
      </ng-container>
    </ng-template>

    <ng-container *encapsulate="encapsulation">
      <ng-container *ngTemplateOutlet="defaultComponentOrContentTemplate"></ng-container>
    </ng-container>
  `,
})
export class PdsPageFooter {
  @Input() encapsulation: string;

  constructor(
    @Optional() @Inject(PDS_PAGE_ENCAPSULATION) encapsulation?: /* @dynamic */ string,
    @Optional() @Inject(PDS_PAGE_FOOTER_COMPONENT) readonly component?: Type<any>
  ) {
    if (encapsulation) this.encapsulation = encapsulation;
  }
}
