import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { PdsSelectListModule } from './module';

export default {
  title: 'PDS Components/Components/Select-List',
  decorators: [
    moduleMetadata({
      imports: [PdsSelectListModule],
    }),
  ],
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `
    <pds-select-list [multiple]="multiple" [limit]="limit" #list>
      <pds-select-option *ngFor="let option of options" [value]="option">
        <span>{{ option }}</span>
        <span *ngIf="list.isSelected(option)">✅</span>
      </pds-select-option>
    </pds-select-list>
  `,
});

export const Default = template.bind({});
Default.args = {
  multiple: false,
  limit: 3,
  options: ['Foo', 'Bar', 'Baz', 'Biz'],
};
