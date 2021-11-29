import { Meta, Story } from '@storybook/angular';
import { PdsStepCounter } from './step-counter';

export default {
  title: 'PDS Components/Components/Step-Counter',
  component: PdsStepCounter,
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `<pds-step-counter [value]="value" [max]="max"></pds-step-counter>`,
});

export const Default = template.bind({});
Default.args = {
  value: 20,
  max: 30,
};
