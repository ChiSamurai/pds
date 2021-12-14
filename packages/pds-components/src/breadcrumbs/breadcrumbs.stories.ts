import { Meta, Story } from '@storybook/angular';
import { PdsBreadcrumbs } from './breadcrumbs';

export default {
  title: 'PDS Components/Components/Breadcrumbs',
  component: PdsBreadcrumbs,
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `
    <pds-breadcrumbs [entries]="entries">
      <strong>You are here:</strong>
    </pds-breadcrumbs>
  `,
});

export const Default = template.bind({});
Default.args = {
  entries: [
    { title: 'Foo', linkUrl: '#' },
    { title: 'Bar', linkUrl: '#' },
    { title: 'Baz', linkUrl: '#' },
  ],
};
