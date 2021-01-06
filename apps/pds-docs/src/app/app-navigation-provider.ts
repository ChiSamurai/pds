import { Provider } from '@angular/core';
import { NAVIGATION_ENTRIES, NavigationEntry, STATIC_NAVIGATION_ENTRIES } from '@vitagroup/cdk';

export const APP_NAV_ENTRY_PROVIDER: Provider = {
  provide: NAVIGATION_ENTRIES,
  useValue: [
    {
      name: 'Getting Started',
      children: [
        {
          name: 'Introduction',
          linkUrl: '/',
        },
        {
          name: 'Installation',
          linkUrl: '/install',
        },
      ] as NavigationEntry[],
    },
    {
      name: 'Components',
      linkUrl: '/pds-components',
    },
    {
      name: 'CSS',
      linkUrl: '/pds-css',
    },
    {
      name: 'CDK',
      linkUrl: '/cdk',
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
