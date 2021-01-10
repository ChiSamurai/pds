import { Provider } from '@angular/core';
import { SVG_ICON_IMPORT, SvgIconImportConfig } from '@vitagroup/cdk';
import { appIconVitagroupSignet } from '../icons/app-icons';
import { faBrandIconGithub } from '../icons/fa-brand-icons';
import {
  faSolidIconArrowLeft,
  faSolidIconArrowRight,
  faSolidIconGlobe,
  faSolidIconSearch,
} from '../icons/fa-solid-icons';

export const APP_ICON_IMPORT_PROVIDER: Provider = {
  provide: SVG_ICON_IMPORT,
  useValue: {
    icons: [
      appIconVitagroupSignet,
      faSolidIconSearch,
      faSolidIconGlobe,
      faBrandIconGithub,
      faSolidIconArrowRight,
      faSolidIconArrowLeft,
    ],
  } as SvgIconImportConfig,
};
