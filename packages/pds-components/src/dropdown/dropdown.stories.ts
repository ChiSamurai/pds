import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { PdsSelectListModule } from '../select-list/module';
import { PdsDropdownModule } from './module';

export default {
  title: 'PDS Components/Components/Dropdown',
  decorators: [
    moduleMetadata({
      imports: [PdsDropdownModule, PdsSelectListModule],
    }),
  ],
  argTypes: {
    preferredPositionX: {
      options: ['left', 'right'],
      control: 'select',
    },
    preferredPositionY: {
      options: ['top', 'bottom'],
      control: 'select',
    },
  },
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `
    <button class="primary"
      [pdsDropdown]="dropdown"
      [pdsDropdownPreferredPosition]="[ preferredPositionX, preferredPositionY ]">
      Dropdown
    </button>

    <pds-dropdown #dropdown>
      <pds-select-list>
        <h4 *ngIf="withHeader">Options</h4>

        <pds-select-option *ngFor="let option of options" [value]="option">{{ option }}</pds-select-option>

        <div *ngIf="withFooter">
          <button class="primary block">Button</button>
          <button class="secondary block">Button</button>
        </div>
      </pds-select-list>
    </pds-dropdown>
  `,
});

export const Default = template.bind({});
Default.args = {
  preferredPositionX: 'left',
  preferredPositionY: 'bottom',
  options: ['Foo', 'Bar', 'Baz'],
  withHeader: false,
  withFooter: false,
};

export const WithHeader = template.bind({});
WithHeader.args = {
  preferredPositionX: 'left',
  preferredPositionY: 'bottom',
  options: ['Foo', 'Bar', 'Baz'],
  withHeader: true,
  withFooter: false,
};

export const WithFooter = template.bind({});
WithFooter.args = {
  preferredPositionX: 'left',
  preferredPositionY: 'bottom',
  options: ['Foo', 'Bar', 'Baz'],
  withHeader: false,
  withFooter: true,
};
