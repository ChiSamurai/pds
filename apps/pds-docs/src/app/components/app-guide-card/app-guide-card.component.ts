import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIconModule } from '@vitagroup/cdk';
import { CardModule, PdsCardFooter } from '@vitagroup/pds-components';
import { AppGuide } from '../../interfaces/app-guide.interface';
import { MarkedPipeModule } from '../../pipes/marked.pipe';

@Component({
  selector: 'pds-app-guide-card',
  encapsulation: ViewEncapsulation.None,
  styles: ['pds-app-guide-card { display: block }'],
  template: `
    <ng-template #ngContentFooter>
      <ng-content select="pds-card-footer"></ng-content>
    </ng-template>

    <pds-card>
      <pds-card-header>
        <h5>{{ guide.title || guide.slug }}</h5>
      </pds-card-header>
      <pds-card-content [innerHTML]="guide.description | md"></pds-card-content>
      <pds-card-footer *ngIf="!hasContentFooter; else ngContentFooter">
        <button [routerLink]="['/', 'guides', guide.slug]">
          <span>Read</span>
          <svg-icon name="arrow-right"></svg-icon>
        </button>
      </pds-card-footer>
    </pds-card>
  `,
})
export class AppGuideCardComponent {
  @ContentChild(PdsCardFooter, { static: true })
  protected readonly footer: PdsCardFooter | null;

  get hasContentFooter(): boolean {
    return this.footer != null;
  }

  @Input()
  guide: AppGuide;
}

@NgModule({
  declarations: [AppGuideCardComponent],
  exports: [AppGuideCardComponent],
  imports: [CardModule, RouterModule, SvgIconModule, MarkedPipeModule, CommonModule],
})
export class AppGuideCardModule {}
