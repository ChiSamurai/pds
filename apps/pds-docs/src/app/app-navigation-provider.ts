import { Provider } from '@angular/core';
import { NAVIGATION_ENTRIES, NavigationEntry, STATIC_NAVIGATION_ENTRIES } from '@vitagroup/cdk';

export const APP_NAV_ENTRY_PROVIDER: Provider = {
  provide: NAVIGATION_ENTRIES,
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
  ] as NavigationEntry[],
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
  ] as NavigationEntry[],
};
