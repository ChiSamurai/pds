import { Component, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { DEFAULT_DOCUMENTATION_TABS } from '../../base-documentation/base-documentation.component';
import { NavEntry } from '@vitagroup/cdk';
import { BaseDocumentationCardComponent } from '../../base-documentation/base-documentation-card/base-documentation-card.component';

const MY_NAV_ENTRIES: NavEntry[] = [
  {
    name: 'Primary Entry 1'
  },
  {
    name: 'Primary  Entry 2'
  },
  {
    name: 'Primary  Entry 3'
  },
  {
    name: 'Primary  Entry 4'
  }
];

const MY_NAV_ENTRIES_W_CHILDREN: NavEntry[] = [
  {
    name: 'Primary Entry 1'
  },
  {
    name: 'Primary Entry 2 with children',
    children: [
      {
        name: 'first child'
      },
      {
        name: 'second child'
      }
    ]
  },
  {
    name: 'Primary  Entry 3'
  },
  {
    name: 'Primary  Entry 4'
  }
];

const MY_SECONDARY_NAV_ENTRIES: NavEntry[] = [
  {
    name: 'Secondary Entry 1'
  },
  {
    name: 'Secondary Entry 2'
  }
];

@Component({
  selector: 'pds-app-nav-documentation',
  templateUrl: './nav-documentation.component.html',
  styleUrls: ['./nav-documentation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavDocumentationComponent {
  @ViewChildren(BaseDocumentationCardComponent) documentationCards: QueryList<BaseDocumentationCardComponent>;
  readonly DEFAULT_DOCUMENTATION_TABS = DEFAULT_DOCUMENTATION_TABS;


  readonly navEntries = MY_NAV_ENTRIES;
  readonly navEntriesWithChildren = MY_NAV_ENTRIES_W_CHILDREN;
  readonly secondaryNavEntries = MY_SECONDARY_NAV_ENTRIES;
  customEntryStyle = {
    fontStyle: 'italic',
    cursor: 'crosshair',
    alignSelf: 'flex-end',
    paddingRight: '1em',
    borderBottom: '1px solid grey'
  };
  
  hasChildren(entry: NavEntry): boolean {
    return 'children' in entry;
  }

}
