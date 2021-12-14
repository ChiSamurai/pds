import { Meta, Story } from '@storybook/angular';

export default {
  title: 'PDS Components/Components/Buttons',
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `<button [class]="accent" [disabled]="disabled">{{ innerText }}</button>`,
});

export const Primary = template.bind({});
Primary.args = {
  innerText: 'Button',
  accent: 'primary',
  disabled: false,
};

export const Secondary = template.bind({});
Secondary.args = {
  innerText: 'Button',
  accent: 'secondary',
  disabled: false,
};
