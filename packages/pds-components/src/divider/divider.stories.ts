import { Meta, Story } from '@storybook/angular';
import { PdsDivider } from './divider';

export default {
  title: 'PDS Components/Components/Divider',
  component: PdsDivider,
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `<pds-divider [space]="space" [vertical]="vertical" [size]="size"></pds-divider>`,
});

export const Default = template.bind({});
Default.args = {
  space: 'sm',
  vertical: false,
  size: '240px',
};

export const Vertical = template.bind({});
Vertical.args = {
  space: 'sm',
  vertical: true,
  size: '240px',
};
