import { Meta, Story } from '@storybook/angular';
import { PdsComboBox } from './combo-box';

export default {
  title: 'PDS Components/Components/Combo-Box',
  component: PdsComboBox,
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `<pds-combo-box [value]="value" [disabled]="disabled" [readOnly]="readOnly"></pds-combo-box>`,
});

export const Default = template.bind({});
Default.args = {
  value: '',
  disabled: false,
  readOnly: false,
};
