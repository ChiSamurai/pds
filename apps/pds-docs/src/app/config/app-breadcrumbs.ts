import { Provider } from '@angular/core';
import { ActiveSiteRef, BREADCRUMB_TITLE_SELECTOR } from '@vitagroup/common';

export function selectAppBreadcrumbsTitle({ activatedRoute }: ActiveSiteRef): string {
  return (
    activatedRoute.params.chapter ||
    activatedRoute.parent.params.chapter ||
    activatedRoute.params.slug ||
    activatedRoute.parent.params.slug ||
    activatedRoute.firstChild?.data.doc?.title ||
    activatedRoute.data?.title
  );
}

export const APP_BREADCRUMB_TITLE_SELECTOR_PROVIDER: Provider = {
  provide: BREADCRUMB_TITLE_SELECTOR,
  useValue: selectAppBreadcrumbsTitle,
};
