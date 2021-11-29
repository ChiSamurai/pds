import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { PdsSelectListModule } from '../select-list/module';
import { PdsSelectBoxModule } from './module';

export default {
  title: 'PDS Components/Components/Select-Box',
  decorators: [
    moduleMetadata({
      imports: [PdsSelectBoxModule, PdsSelectListModule],
    }),
  ],
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `
    <pds-select-box [placeholder]="placeholder" [disabled]="disabled" [readOnly]="readOnly">
      <pds-select-list [multiple]="multiple" [limit]="limit">
        <pds-select-option *ngFor="let option of options" [value]="option">{{ option }}</pds-select-option>
      </pds-select-list>
    </pds-select-box>
  `,
});

export const Default = template.bind({});
Default.args = {
  placeholder: '',
  disabled: false,
  readOnly: false,
  options: ['Foo', 'Bar', 'Baz'],
  multiple: false,
};
