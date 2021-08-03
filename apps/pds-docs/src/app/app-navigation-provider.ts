import { Provider } from '@angular/core';
import { NAV_ENTRIES, NavEntry } from '@vitagroup/cdk';
import { PDS_SECONDARY_NAV_ENTRIES } from '@vitagroup/pds-components';

export const APP_NAV_ENTRY_PROVIDER: Provider = {
  provide: NAV_ENTRIES,
  useValue: [
    {
      name: $localize`Introduction`,
      linkUrl: '/',
    },
    {
      name: $localize`Guides`,
      linkUrl: '/guides',
    },
    {
      name: $localize`Components`,
      linkUrl: '/components',
    },
    {
      name: $localize`CSS`,
      linkUrl: '/css',
    },
  ] as NavEntry[],
};

export const APP_SECONDARY_NAV_ENTRY_PROVIDER: Provider = {
  provide: PDS_SECONDARY_NAV_ENTRIES,
  useValue: [
    {
      name: 'Github',
      linkUrl: 'https://github.com/vitagroupag',
      iconName: 'github',
    },
    {
      name: 'Homepage',
      linkUrl: 'https://vitagroup.ag',
      iconName: 'globe',
    },
  ] as NavEntry[],
};
