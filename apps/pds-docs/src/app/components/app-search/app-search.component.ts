import { Component, ViewEncapsulation } from '@angular/core';
import { AppDoc } from '../../interfaces/app-doc.interface';
import { AppDocService } from '../../services/app-doc.service';

@Component({
  selector: 'pds-app-search',
  styleUrls: ['app-search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <pds-text-box placeholder="Search docs..." [pdsInputDropdown]="searchDropdown">
      <svg-icon name="search" pdsAfter></svg-icon>
    </pds-text-box>

    <pds-dropdown pdsInputDropdownDef #searchDropdown>
      <pds-select-list>
        <ng-container *ngIf="docs.asObservable() | async | pdsInputFilter as filteredGuides">
          <ng-container *ngIf="filteredGuides?.length; else noSearchResult">
            <pds-select-option
              *ngFor="let doc of filteredGuides"
              routerLinkOrHref="/docs/chapters/{{ doc.chapter }}/{{ doc.slug }}"
              [value]="doc.title"
            >
              <svg-icon class="text-primary" [name]="resolveIconName(doc)"></svg-icon>
              <strong>{{ doc.title }}</strong>
              <small class="text-gray-secondary">{{ doc.chapter | titlecase }}</small>
            </pds-select-option>
          </ng-container>
          <ng-template #noSearchResult>
            <pds-select-option disabled="true">Seems there's nothing related to your search 🤔</pds-select-option>
          </ng-template>
        </ng-container>
      </pds-select-list>
    </pds-dropdown>
  `,
})
export class AppSearchComponent {
  constructor(readonly docs: AppDocService) {}

  resolveIconName(doc: AppDoc): string {
    switch (doc.chapter) {
      case 'components':
      case 'common':
      case 'cdk':
        return 'angular';
      case 'css':
        return 'sass';
      default:
        return 'book-open';
    }
  }
}
