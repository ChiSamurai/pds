import { Meta, Story } from '@storybook/angular';
import { PdsToggleBox } from './toggle-box';

export default {
  title: 'PDS Components/Components/Toggle-Box',
  component: PdsToggleBox,
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `
    <pds-toggle-box
      [label]="label" [labelAlign]="labelAlign"
      [disabled]="disabled" [readOnly]="readOnly">
    </pds-toggle-box>
  `,
});

export const Default = template.bind({});
Default.args = {
  label: 'Label',
  labelAlign: 'after',
  disabled: false,
  readOnly: false,
};
