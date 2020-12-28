import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgIcon } from './svg-icon';
import { SvgIconHost } from './svg-icon-host';
import { SvgIconImporter } from './svg-icon-importer';

const declarations = [SvgIcon];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class SvgIconModule {
  constructor(host: SvgIconHost, importer: SvgIconImporter) {
    // bootstrapping the SvgIconRegistry and SvgIconHost providers here
    // todo(@janunld): consider moving the initialization into an APP_BOOTSTRAP_LISTENER
  }
}
