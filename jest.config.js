const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/packages/pds-css',
    '<rootDir>/packages/common',
    '<rootDir>/packages/cdk',
    '<rootDir>/packages/pds-components',
    '<rootDir>/apps/pds-docs',
    '<rootDir>/packages/eslint-test',
  ],
};
