import { Meta, Story } from '@storybook/angular';
import { PdsRingLoader } from './ring-loader';

export default {
  title: 'PDS Components/Components/Ring-Loader',
  component: PdsRingLoader,
  parameters: {
    layout: 'centered',
  },
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `<pds-ring-loader [size]="size" [width]="width"></pds-ring-loader>`,
});

export const Default = template.bind({});
Default.args = {
  size: 64,
  width: 5,
};
