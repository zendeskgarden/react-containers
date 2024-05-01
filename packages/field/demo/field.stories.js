import { FieldContainer } from '@zendeskgarden/container-field';
import { FieldStory } from './stories/FieldStory';
import README from '../README.md';

export default {
  title: 'Packages/Field',
  component: FieldContainer
};

export const Field = {
  render: args => <FieldStory {...args} />,
  name: 'Field',

  args: {
    as: 'hook',
    hasHint: true,
    hasMessage: true
  },

  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',

      table: {
        category: 'Story'
      }
    }
  }
};
