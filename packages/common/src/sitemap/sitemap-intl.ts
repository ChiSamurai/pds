import { Injectable } from '@angular/core';
import { SiteRef } from './sitemap';

@Injectable()
export abstract class SitemapIntl {
  abstract getSiteRefTitle(ref: SiteRef): string;
}
