import { Provider } from '@angular/core';
import { SVG_ICON_IMPORT, SvgIconImportConfig } from '@vitagroup/cdk';
import { appIconVitagroupSignet } from '../icons/app-icons';
import { faBrandIconGithub, faBrandIconSass } from '../icons/fa-brand-icons';
import {
  faSolidIconArrowLeft,
  faSolidIconArrowRight,
  faSolidIconBookOpen,
  faSolidIconBuilding,
  faSolidIconCircle,
  faSolidIconCopy,
  faSolidIconExclamationTriangle,
  faSolidIconGlobe,
  faSolidIconHome,
  faSolidIconInfo,
  faSolidIconMoon,
  faSolidIconPuzzlePiece,
  faSolidIconSearch,
  faSolidIconSun,
  faSolidIconTimes,
  faSolidIconTools,
  faSolidIconUser,
  faSolidIconUsers,
} from '../icons/fa-solid-icons';

export const APP_ICON_IMPORT_PROVIDER: Provider = {
  provide: SVG_ICON_IMPORT,
  useValue: {
    icons: [
      appIconVitagroupSignet,
      faSolidIconSun,
      faSolidIconMoon,
      faSolidIconSearch,
      faSolidIconTimes,
      faSolidIconArrowRight,
      faSolidIconArrowLeft,
      faSolidIconExclamationTriangle,
      faSolidIconCopy,
      faSolidIconInfo,
      faSolidIconGlobe,
      faSolidIconUser,
      faSolidIconUsers,
      faSolidIconCircle,
      faSolidIconBuilding,
      faSolidIconBookOpen,
      faSolidIconPuzzlePiece,
      faSolidIconHome,
      faSolidIconTools,
      faBrandIconGithub,
      faBrandIconSass,
    ],
  } as SvgIconImportConfig,
};
