import { Provider } from '@angular/core';
import { NAVIGATION_ENTRIES, NavigationEntry, STATIC_NAVIGATION_ENTRIES } from '@vitagroup/cdk';

export const APP_NAV_ENTRY_PROVIDER: Provider = {
  provide: NAVIGATION_ENTRIES,
  useValue: [
    {
      name: 'Overview',
      linkUrl: '/search',
    },
    {
      name: 'Guides',
      linkUrl: '/guides',
    },
    {
      name: 'Components',
      linkUrl: '/components',
    },
    {
      name: 'Schematics',
      linkUrl: '/schematics',
    },
    {
      name: 'CDK',
      linkUrl: '/cdk',
    },
    {
      name: 'CSS',
      linkUrl: '/css',
    },
    {
      name: 'Devkit',
      linkUrl: '/devkit',
    },
  ] as NavigationEntry[],
};

export const APP_STATIC_NAV_ENTRY_PROVIDER: Provider = {
  provide: STATIC_NAVIGATION_ENTRIES,
  useValue: [
    {
      name: 'Github',
      linkUrl: 'https://github.com/vitagroupag',
    },
    {
      name: 'Homepage',
      linkUrl: 'https://vitagroup.ag',
    },
  ] as NavigationEntry[],
};
