import { Provider } from '@angular/core';
import { NAV_ENTRIES, NavEntry, STATIC_NAVIGATION_ENTRIES } from '@vitagroup/cdk';

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

export const APP_STATIC_NAV_ENTRY_PROVIDER: Provider = {
  provide: STATIC_NAVIGATION_ENTRIES,
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
