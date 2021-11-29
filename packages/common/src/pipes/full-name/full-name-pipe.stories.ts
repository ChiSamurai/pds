import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { FullNamePipe, FullNamePipeModule } from './full-name-pipe';

export default {
  title: 'Common/Pipes/Full Name',
  component: FullNamePipe,
  decorators: [
    moduleMetadata({
      imports: [FullNamePipeModule],
    }),
  ],
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `<pre>{{ value | fullName: format }}</pre>`,
});
const value = {
  firstName: 'Jane',
  lastName: 'Doe',
  title: 'Prof. Dr.',
};

export const Full = template.bind({});
Full.args = {
  format: 'full',
  value,
};

export const Short = template.bind({});
Short.args = {
  format: 'short',
  value,
};

export const ShortLast = template.bind({});
ShortLast.args = {
  format: 'shortLast',
  value,
};

export const Reversed = template.bind({});
Reversed.args = {
  format: 'reversed',
  value,
};

export const Format = template.bind({});
Format.args = {
  format: 'TT ff ll',
  value,
};
