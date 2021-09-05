import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIconModule } from '@vitagroup/cdk';
import { PdsCardFooter, PdsCardModule } from '@vitagroup/pds-components';
import { AppDoc } from '../../interfaces/app-doc.interface';
import { MarkedPipeModule } from '../../pipes/marked.pipe';

@Component({
  selector: 'pds-app-doc-card',
  encapsulation: ViewEncapsulation.None,
  styles: ['pds-app-doc-card { display: block }'],
  template: `
    <ng-template #ngContentFooter>
      <ng-content select="pds-card-footer"></ng-content>
    </ng-template>

    <pds-card>
      <pds-card-header>
        <h3>{{ doc.title | titlecase }}</h3>
      </pds-card-header>
      <pds-card-content [innerHTML]="doc.description | md"></pds-card-content>
      <pds-card-footer *ngIf="!hasContentFooter; else ngContentFooter">
        <button [routerLink]="linkUrl">
          <svg-icon name="arrow-right"></svg-icon>
        </button>
      </pds-card-footer>
    </pds-card>
  `,
})
export class AppDocCardComponent {
  @ContentChild(PdsCardFooter, { static: true })
  protected readonly footer: PdsCardFooter | null;

  get hasContentFooter(): boolean {
    return this.footer != null;
  }
  get linkUrl(): string {
    return this.doc?.chapter ? `/docs/chapters/${this.doc.chapter}/${this.doc.slug}` : `/docs/${this.doc.slug}`;
  }

  @Input() doc: AppDoc;
}

@NgModule({
  declarations: [AppDocCardComponent],
  exports: [AppDocCardComponent],
  imports: [PdsCardModule, RouterModule, SvgIconModule, MarkedPipeModule, CommonModule],
})
export class AppGuideCardModule {}
