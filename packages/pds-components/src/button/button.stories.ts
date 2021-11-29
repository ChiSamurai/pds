import { Meta, Story } from '@storybook/angular';
import { PdsFabButton } from './fab';

export default {
  title: 'PDS Components/Components/Buttons',
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `<button [class.secondary]="secondary" [disabled]="disabled">{{ innerText }}</button>`,
});

export const Default = template.bind({});
Default.args = {
  innerText: 'Button',
  secondary: false,
  disabled: false,
};

export const Secondary = template.bind({});
Secondary.args = {
  innerText: 'Button',
  secondary: true,
  disabled: false,
};

export const Disabled = template.bind({});
Disabled.args = {
  innerText: 'Button',
  secondary: false,
  disabled: true,
};

const fabTemplate: Story = (args) => ({
  props: args,
  template: `<pds-fab ${
    args.inline ? 'inline' : ''
  } [class.secondary]="secondary" [disabled]="disabled">{{ innerText }}</pds-fab>`,
  component: PdsFabButton,
});

export const Fab = fabTemplate.bind({});
Fab.args = {
  innerText: 'Go',
  secondary: false,
  disabled: false,
  inline: true,
};
