import { SelectionStory } from './stories/SelectionStory';

export default {
  title: 'Packages/FocusVisible/[patterns]'
};

export const Selection = {
  render: args => <SelectionStory {...args} />,
  name: 'Selection'
};
