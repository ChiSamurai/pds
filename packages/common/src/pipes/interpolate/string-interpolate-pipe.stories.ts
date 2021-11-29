import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { StringInterpolatePipe, StringInterpolatePipeModule } from './string-interpolate-pipe';

export default {
  title: 'Common/Pipes/Interpolate',
  component: StringInterpolatePipe,
  decorators: [
    moduleMetadata({
      imports: [StringInterpolatePipeModule],
    }),
  ],
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `<pre>{{ value | interpolate: context }}</pre>`,
});

export const Default = template.bind({});
Default.args = {
  value: 'Hello, $greeted!',
  context: {
    greeted: 'World',
  },
};
