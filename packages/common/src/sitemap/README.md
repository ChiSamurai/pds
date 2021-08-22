# Sitemap

A `Sitemap` aims to provide a tree structure of `SiteRef`s that can be used to further build on.

## Setup

```typescript
export enum AppLegalPageKeys {
  Privacy = 'privacy',
  Imprint = 'imprint',
  Terms = 'terms'
}

export const SITEMAP_PROVIDER: Provider = {
  provide: Sitemap,
  useValue: new Sitemap({
    routes: APP_ROUTES,
    loadChildren: {
      '': APP_DASHBOARD_ROUTES,
      'help': APP_HELP_ROUTES,
      'legal': {
        routes: APP_LEGAL_ROUTES,
        loadParamValues: {
          ':legalPageKey': Object.values(AppLegalPageKeys)
        }
      }
    }
  })
};
```
