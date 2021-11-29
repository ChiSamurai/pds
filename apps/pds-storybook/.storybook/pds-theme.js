import { create } from '@storybook/theming';

const BERRY = '#720035';

export default create({
  base: 'light',

  colorPrimary: BERRY,
  colorSecondary: BERRY,

  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: '#e0e0e0',
  appBorderRadius: 2,

  // Typography
  fontBase: '"PT Sans", "Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'black',
  barSelectedColor: BERRY,
  barBg: 'white',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 2,

  brandTitle: 'PDS Storybook',
  brandUrl: 'https://github.com/vitagroupag/pds',
  brandImage: 'https://www.vitagroup.ag/themes/master_theme/logo.svg',
});
