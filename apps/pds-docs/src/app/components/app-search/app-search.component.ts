import { Component, ViewEncapsulation } from '@angular/core';
import { AppGuide } from '../../interfaces/app-guide.interface';
import { AppGuidesService } from '../../services/app-guides.service';

@Component({
  selector: 'pds-app-search',
  styleUrls: ['app-search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <pds-text-box placeholder="Search docs..." [pdsInputDropdown]="searchDropdown">
      <svg-icon name="search" pdsBefore></svg-icon>
    </pds-text-box>

    <pds-dropdown pdsInputDropdownDef #searchDropdown>
      <pds-select-list>
        <ng-container *ngIf="appGuides.asObservable() | async | pdsInputFilter as filteredGuides">
          <ng-container *ngIf="filteredGuides?.length; else noSearchResult">
            <pds-select-option *ngFor="let guide of filteredGuides" [routerLinkOrHref]="resolveLinkUrl(guide)">
              <svg-icon class="text-primary" [name]="resolveIconName(guide)"></svg-icon>
              <strong>{{ guide.title }}</strong>
              <span class="text-gray-secondary">&bull;</span>
              <small class="text-gray-secondary">{{ guide.chapter }}</small>
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
  constructor(readonly appGuides: AppGuidesService) {}

  resolveIconName(guide: AppGuide): string {
    switch (guide.chapter) {
      case 'Components':
        return 'puzzle-piece';
      default:
        return 'book-open';
    }
  }
  resolveLinkUrl(guide: AppGuide): string {
    switch (guide.chapter) {
      case 'Components':
        return `/components/${guide.slug}`;
      default:
        return `/guides/${guide.slug}`;
    }
  }
}
