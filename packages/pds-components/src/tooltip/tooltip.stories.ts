import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { PdsBannerModule } from '../banner/module';
import { PdsTooltipModule } from './module';

export default {
  title: 'PDS Components/Components/Tooltip',
  decorators: [
    moduleMetadata({
      imports: [PdsTooltipModule, PdsBannerModule],
    }),
  ],
  argTypes: {
    preferredPosition: {
      options: ['top', 'right', 'bottom', 'left'],
      control: 'select',
    },
  },
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `
    <strong [pdsTooltip]="tooltip">
      Hover me
    </strong>

    <pds-tooltip [preferredPosition]="preferredPosition" #tooltip>
      <pds-banner class="xs">{{ innerText }}</pds-banner>
    </pds-tooltip>
  `,
});

export const Default = template.bind({});
Default.args = {
  innerText: 'Hello, World!',
  preferredPosition: 'bottom',
};
