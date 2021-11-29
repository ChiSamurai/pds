import { Meta, Story } from '@storybook/angular';
import { PdsCheckBox } from './check-box';

export default {
  title: 'PDS Components/Components/Check-Box',
  component: PdsCheckBox,
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `
    <pds-check-box
      [label]="label" [labelAlign]="labelAlign" [intermediate]="intermediate"
      [strokeWidth]="strokeWidth" [strokeLineCap]="strokeLineCap"
      [disabled]="disabled" [readOnly]="readOnly">
    </pds-check-box>
  `,
});

export const Default = template.bind({});
Default.args = {
  label: 'Label',
  labelAlign: 'after',
  intermediate: false,
  disabled: false,
  readOnly: false,
  strokeWidth: 3,
  strokeLineCap: 'round',
};
