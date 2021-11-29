import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { PdsTabsModule } from './module';

export default {
  title: 'PDS Components/Components/Tabs',
  decorators: [
    moduleMetadata({
      imports: [PdsTabsModule],
    }),
  ],
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `
    <pds-tabs>
      <pds-tab *ngFor="let tab of tabs">{{ tab }}</pds-tab>
    </pds-tabs>
  `,
});

export const Default = template.bind({});
Default.args = {
  tabs: ['Foo', 'Bar', 'Baz'],
};
