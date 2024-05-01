import { BreadcrumbContainer } from '@zendeskgarden/container-breadcrumb';
import { BreadcrumbStory } from './stories/BreadcrumbStory';
import README from '../README.md';

export default {
  title: 'Packages/Breadcrumb',
  component: BreadcrumbContainer
};

export const Breadcrumb = {
  render: args => <BreadcrumbStory {...args} />,
  name: 'Breadcrumb',

  args: {
    as: 'hook',
    'aria-label': 'Breadcrumbs'
  },

  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',

      table: {
        category: 'Story'
      }
    },

    'aria-label': {
      control: 'text'
    }
  }
};
