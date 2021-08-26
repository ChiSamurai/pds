import { NavEntry } from '@vitagroup/cdk';

export const MY_NAV_ENTRIES: NavEntry[] = [
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

export const MY_NAV_ENTRIES_W_CHILDREN: NavEntry[] = [
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

export const MY_SECONDARY_NAV_ENTRIES: NavEntry[] = [
  {
    name: 'Secondary Entry 1'
  },
  {
    name: 'Secondary Entry 2'
  }
];

export const customEntryStyle = {
  fontStyle: 'italic',
  cursor: 'crosshair',
  alignSelf: 'flex-end',
  paddingRight: '1em',
  borderBottom: '1px solid grey'
};

export function hasChildren(entry: NavEntry): boolean {
  return 'children' in entry;
}

