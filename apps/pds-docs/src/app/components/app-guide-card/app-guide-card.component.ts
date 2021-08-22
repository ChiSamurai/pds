import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIconModule } from '@vitagroup/cdk';
import { PdsCardModule, PdsCardFooter } from '@vitagroup/pds-components';
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
        <h3>{{ guide.title || guide.slug }}</h3>
      </pds-card-header>
      <pds-card-content *ngIf="description" [innerHTML]="guide.description | md"></pds-card-content>
      <pds-card-footer *ngIf="!hasContentFooter; else ngContentFooter">
        <button [routerLink]="linkUrl || ['/', 'guides', guide.slug]">
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

  @Input() guide: AppGuide;
  @Input() linkUrl: string;
  @Input() description = true;
}

@NgModule({
  declarations: [AppGuideCardComponent],
  exports: [AppGuideCardComponent],
  imports: [PdsCardModule, RouterModule, SvgIconModule, MarkedPipeModule, CommonModule],
})
export class AppGuideCardModule {}
