import { Meta, Story } from '@storybook/angular';
import { PdsBanner } from './banner';

export default {
  title: 'PDS Components/Components/Banner',
  component: PdsBanner,
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `
    <pds-banner [class.xs]="xs">
      <span pdsBefore *ngIf="before">{{ before }}</span>
      <span>{{ innerText }}</span>
      <span pdsAfter *ngIf="after">{{ after }}</span>
    </pds-banner>
  `,
});

export const Default = template.bind({});
Default.args = {
  xs: false,
  innerText: 'Hello, World',
  before: '🙂',
  after: '📌',
};
