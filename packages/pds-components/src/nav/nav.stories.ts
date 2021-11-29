import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { NavEntry } from '@vitagroup/cdk';
import { PdsNavModule } from './module';
import { PdsNav } from './nav';

export default {
  title: 'PDS Components/Components/Nav',
  component: PdsNav,
  decorators: [
    moduleMetadata({
      imports: [PdsNavModule],
    }),
  ],
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `<pds-nav [entries]="entries" [secondaryEntries]="secondaryEntries"></pds-nav>`,
});

export const Default = template.bind({});
Default.args = {
  entries: [
    { name: 'Foo', linkUrl: '#' },
    { name: 'Bar', linkUrl: '#' },
    { name: 'Baz', linkUrl: '#' },
  ] as NavEntry[],
  secondaryEntries: [{ name: 'Biz', linkUrl: '#' }] as NavEntry[],
};
