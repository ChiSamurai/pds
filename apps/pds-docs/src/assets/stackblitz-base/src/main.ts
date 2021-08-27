import { ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AppModule } from './app/app.module';
import 'zone.js';

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    defaultEncapsulation: ViewEncapsulation.None
  })
  .catch((err) => console.error(err));
