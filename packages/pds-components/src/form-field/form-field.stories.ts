import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { PdsTextBoxModule } from '../text-box/module';
import { PdsFormField } from './form-field';

export default {
  title: 'PDS Components/Components/Form-Field',
  component: PdsFormField,
  decorators: [
    moduleMetadata({
      imports: [PdsTextBoxModule],
    }),
  ],
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `
    <pds-form-field>
      <label *ngIf="labelText">{{ labelText }}</label>
      <pds-text-box></pds-text-box>
    </pds-form-field>
  `,
});

export const Default = template.bind({});
Default.args = { labelText: 'Label' };
