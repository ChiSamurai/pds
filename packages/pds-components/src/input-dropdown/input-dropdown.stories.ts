import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { PdsChipModule } from '../chip/module';
import { PdsComboBoxModule } from '../combo-box/module';
import { PdsDropdownModule } from '../dropdown/module';
import { PdsSelectListModule } from '../select-list/module';
import { PdsInputDropdownOutlet } from './input-dropdown-outlet';
import { PdsInputDropdownModule } from './module';

export default {
  title: 'PDS Components/Components/Input-Dropdown',
  component: PdsInputDropdownOutlet,
  decorators: [
    moduleMetadata({
      imports: [
        PdsInputDropdownModule,
        PdsDropdownModule,
        PdsComboBoxModule,
        PdsChipModule,
        PdsSelectListModule,
        CommonModule,
      ],
    }),
  ],
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `
    <pds-combo-box [pdsInputDropdown]="dropdown">
      <pds-chip *pdsComboDef="let value">{{ value }}</pds-chip>
    </pds-combo-box>

    <pds-dropdown pdsInputDropdownDef #dropdown>
      <pds-select-list [multiple]="multiple" [limit]="limit">
        <pds-select-option *ngFor="let option of (options | pdsInputFilter)" [value]="option">
          {{ option }}
        </pds-select-option>
      </pds-select-list>
    </pds-dropdown>
  `,
});

export const Default = template.bind({});
Default.args = {
  preferredPositionX: 'left',
  preferredPositionY: 'bottom',
  options: ['Foo', 'Bar', 'Baz'],
  multiple: true,
};
