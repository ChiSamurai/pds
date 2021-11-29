import { Meta, Story } from '@storybook/angular';
import { PdsAvatar } from './avatar';

export default {
  title: 'PDS Components/Components/Avatar',
  component: PdsAvatar,
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `
    <pds-avatar [size]="size" ${args.interactive ? 'interactive' : ''} ${args.disabled ? 'disabled' : ''}>
      <img [src]="img" alt="Avatar Image">
    </pds-avatar>
  `,
});

export const Default = template.bind({});
Default.args = {
  size: 'md',
  disabled: false,
  interactive: false,
  img: 'https://avatars.dicebear.com/api/pixel-art-neutral/pds.svg',
};

export const Interactive = template.bind({});
Interactive.args = {
  size: 'md',
  disabled: false,
  interactive: true,
  img: 'https://avatars.dicebear.com/api/pixel-art-neutral/pds.svg',
};

export const Disabled = template.bind({});
Disabled.args = {
  size: 'md',
  disabled: true,
  interactive: false,
  img: 'https://avatars.dicebear.com/api/pixel-art-neutral/pds.svg',
};
