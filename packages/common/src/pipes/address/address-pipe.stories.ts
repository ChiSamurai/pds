import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { AddressPipe, AddressPipeModule } from './address-pipe';

export default {
  title: 'Common/Pipes/Address',
  component: AddressPipe,
  decorators: [
    moduleMetadata({
      imports: [AddressPipeModule],
    }),
  ],
} as Meta;

const template: Story = (args) => ({
  props: args,
  template: `<pre>{{ value | address: format }}</pre>`,
});
const value = {
  streetName: 'Street',
  streetNumber: '1a',
  zip: '1337',
  city: 'City',
};

export const Full = template.bind({});
Full.args = {
  format: 'full',
  value,
};

export const City = template.bind({});
City.args = {
  format: 'city',
  value,
};

export const Street = template.bind({});
Street.args = {
  format: 'street',
  value,
};

export const Format = template.bind({});
Format.args = {
  format: 'sss NN,\nZZ ccc',
  value,
};
