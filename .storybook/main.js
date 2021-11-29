const { resolve } = require('path');

module.exports = {
  stories: [],
  addons: [
    {
      name: '@storybook/preset-scss',
      options: {
        sassLoaderOptions: {
          sassOptions: {
            includePaths: [resolve(__dirname, '../packages/pds-css/src')],
          },
        },
      },
    },
    {
      name: '@storybook/addon-docs',
      options: {
        transcludeMarkdown: true,
      },
    },
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
  ],
  /*webpackFinal: async (config, { configType }) => {
    // Make whatever fine-grained changes you need that should apply to all storybook configs

    // Return the altered config
    return config;
  },*/
};
