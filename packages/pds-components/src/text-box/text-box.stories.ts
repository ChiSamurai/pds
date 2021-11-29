import { Meta, Story } from '@storybook/angular';
import { PdsTextBox } from './text-box';

export default {
  title: 'PDS Components/Components/Text-Box',
  component: PdsTextBox,
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `<pds-text-box [placeholder]="placeholder" [disabled]="disabled" [readOnly]="readOnly"></pds-text-box>`,
});

export const Default = template.bind({});
Default.args = {
  placeholder: '',
  disabled: false,
  readOnly: false,
};
