import { Meta, Story } from '@storybook/angular';
import { PdsCard } from './card';

export default {
  title: 'PDS Components/Components/Card',
  component: PdsCard,
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `
    <pds-card>
      <pds-card-header *ngIf="headerText">{{ headerText }}</pds-card-header>
      <pds-card-content *ngIf="innerText">{{ innerText }}</pds-card-content>
      <pds-card-footer *ngIf="footerText">{{ footerText }}</pds-card-footer>
    </pds-card>
  `,
});

export const Default = template.bind({});
Default.args = {
  innerText: 'Hello, World!',
  headerText: '',
  footerText: '',
};
