import { Component, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIconModule } from '@vitagroup/cdk';
import { CardModule } from '@vitagroup/pds-components';
import { AppGuide } from '../../interfaces/app-guide.interface';
import { MarkedPipeModule } from '../../pipes/marked.pipe';

@Component({
  selector: 'pds-app-guide-card',
  encapsulation: ViewEncapsulation.None,
  styles: ['pds-app-guide-card { display: block }'],
  template: `
    <pds-card>
      <pds-card-header>
        <h5>{{ guide.title || guide.slug }}</h5>
      </pds-card-header>
      <pds-card-content [innerHTML]="guide.description | marked"></pds-card-content>
      <pds-card-footer>
        <button [routerLink]="['/', 'guides', guide.slug]">
          <span>Read</span>
          <svg-icon name="arrow-right"></svg-icon>
        </button>
      </pds-card-footer>
    </pds-card>
  `,
})
export class AppGuideCardComponent {
  @Input() guide: AppGuide;
}

@NgModule({
  declarations: [AppGuideCardComponent],
  exports: [AppGuideCardComponent],
  imports: [CardModule, RouterModule, SvgIconModule, MarkedPipeModule],
})
export class AppGuideCardModule {}
