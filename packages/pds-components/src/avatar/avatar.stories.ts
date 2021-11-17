import { Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/dist/ts3.4/client';
import { PdsAvatar } from './avatar';

export default {
  title: 'Components/Avatar',
  component: PdsAvatar,
} as Meta;

const Template: Story<PdsAvatar> = (args) => ({
  props: args,
  template: `
    <pds-avatar size="${args.size}">
      <img src="https://avatars.dicebear.com/api/pixel-art-neutral/pds.svg" alt="Avatar Image" />
    </pds-avatar>
  `,
});

export const Medium = Template.bind({});
Medium.args = { size: 'md' };
Medium.storyName = 'Medium (default)';

export const Large = Template.bind({});
Large.args = { size: 'lg' };
export const Small = Template.bind({});
Small.args = { size: 'sm' };
