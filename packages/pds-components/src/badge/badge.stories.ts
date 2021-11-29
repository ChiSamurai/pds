import { Meta, Story } from '@storybook/angular';
import { PdsBadge } from './badge';

export default {
  title: 'PDS Components/Components/Badge',
  component: PdsBadge,
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `<pds-badge>{{ innerText }}</pds-badge>`,
});

export const Default = template.bind({});
Default.args = { innerText: 40 };
