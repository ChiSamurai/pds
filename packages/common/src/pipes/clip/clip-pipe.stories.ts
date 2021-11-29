import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ClipPipe, ClipPipeModule } from './clip-pipe';

export default {
  title: 'Common/Pipes/Clip',
  component: ClipPipe,
  decorators: [
    moduleMetadata({
      imports: [ClipPipeModule],
    }),
  ],
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `<pre>{{ value | clip: max }}</pre>`,
});

export const Number = template.bind({});
Number.args = {
  max: 99,
  value: 100,
};

export const String = template.bind({});
String.args = {
  max: 9,
  value: '1234567890',
};
