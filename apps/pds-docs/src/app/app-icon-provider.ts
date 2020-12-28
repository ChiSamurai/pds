import { Provider } from '@angular/core';
import { SVG_ICON_IMPORT, SvgIconImportConfig } from '@vitagroup/cdk';
import { svgIconVitagroupSignet } from '../svg-icons';

export const APP_ICON_IMPORT_PROVIDER: Provider = {
  provide: SVG_ICON_IMPORT,
  useValue: {
    icons: [svgIconVitagroupSignet],
  } as SvgIconImportConfig,
};
