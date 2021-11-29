import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { PdsRadioBoxModule } from './radio-box-module';

export default {
  title: 'PDS Components/Components/Radio-Box',
  decorators: [
    moduleMetadata({
      imports: [PdsRadioBoxModule],
    }),
  ],
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `
    <pds-radio-box
      [label]="label" [labelAlign]="labelAlign"
      [disabled]="disabled" [readOnly]="readOnly">
    </pds-radio-box>
  `,
});

export const Default = template.bind({});
Default.args = {
  label: 'Label',
  labelAlign: 'after',
  disabled: false,
  readOnly: false,
};

const groupTemplate: Story = (args) => ({
  props: args,
  styles: ['div { display: flex; align-items: center }', 'pds-radio-box { margin-right: 24px }'],
  template: `
    <div pdsRadioGroup>
      <pds-radio-box
        [label]="label" [labelAlign]="labelAlign"
        [disabled]="disabled" [readOnly]="readOnly">
      </pds-radio-box>
      <pds-radio-box
        [label]="label" [labelAlign]="labelAlign"
        [disabled]="disabled" [readOnly]="readOnly">
      </pds-radio-box>
    </div>
  `,
});

export const Group = groupTemplate.bind({});
Group.args = {
  label: 'Label',
  labelAlign: 'after',
  disabled: false,
  readOnly: false,
};
