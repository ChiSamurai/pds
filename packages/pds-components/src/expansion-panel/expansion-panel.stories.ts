import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { PdsExpansionPanel } from './expansion-panel';
import { PdsExpansionPanelModule } from './module';

export default {
  title: 'PDS Components/Components/Expansion-Panel',
  component: PdsExpansionPanel,
  decorators: [
    moduleMetadata({
      imports: [PdsExpansionPanelModule],
    }),
  ],
} as Meta;

const LOREM_IPSUM =
  'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ' +
  'dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet ' +
  'clita kasd gubergren, no sea.';

const template: Story = (args) => ({
  props: args,
  template: `
    <pds-expansion-panel [expanded]="expanded">
      <pds-expansion-panel-header>{{ headerText }}</pds-expansion-panel-header>
      <pds-expansion-panel-content>{{ innerText }}</pds-expansion-panel-content>
    </pds-expansion-panel>
  `,
});

export const Default = template.bind({});
Default.args = {
  expanded: false,
  headerText: 'Lorem ipsum',
  innerText: LOREM_IPSUM,
};

const groupTemplate: Story = (args) => ({
  props: args,
  template: `
    <pds-expansion-panel-group [multiple]="multiple">
      <pds-expansion-panel>
        <pds-expansion-panel-header>{{ headerText }}</pds-expansion-panel-header>
        <pds-expansion-panel-content>{{ innerText }}</pds-expansion-panel-content>
      </pds-expansion-panel>
      <pds-expansion-panel>
        <pds-expansion-panel-header>{{ headerText }}</pds-expansion-panel-header>
        <pds-expansion-panel-content>{{ innerText }}</pds-expansion-panel-content>
      </pds-expansion-panel>
      <pds-expansion-panel>
        <pds-expansion-panel-header>{{ headerText }}</pds-expansion-panel-header>
        <pds-expansion-panel-content>{{ innerText }}</pds-expansion-panel-content>
      </pds-expansion-panel>
    </pds-expansion-panel-group>
  `,
});

export const Group = groupTemplate.bind({});
Group.args = {
  multiple: false,
  headerText: 'Lorem ipsum',
  innerText: LOREM_IPSUM,
};
