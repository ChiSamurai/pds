import { Meta, Story } from '@storybook/angular';
import { PdsChip } from './chip';

export default {
  title: 'PDS Components/Components/Chip',
  component: PdsChip,
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `<pds-chip>{{ innerText }}</pds-chip>`,
});

export const Default = template.bind({});
Default.args = { innerText: 'Hello, World' };
