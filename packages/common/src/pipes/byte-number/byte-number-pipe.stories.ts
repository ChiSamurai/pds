import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ByteNumberPipe, ByteNumberPipeModule } from './byte-number-pipe';

export default {
  title: 'Common/Pipes/Byte Number',
  component: ByteNumberPipe,
  decorators: [
    moduleMetadata({
      imports: [ByteNumberPipeModule],
    }),
  ],
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `<pre>{{ value | byteNumber: format }}</pre>`,
});
const value = 10_000_000;

export const Default = template.bind({});
Default.args = {
  format: '1.0-2 uu',
  value,
};

export const Full = template.bind({});
Full.args = {
  format: '1.0-2 UU',
  value,
};
