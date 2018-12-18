import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs } from '@storybook/addon-knobs';

import { Button } from '@storybook/react/demo';

storiesOf('Schedule Container', module)
  .addDecorator(withKnobs)
  .add('with some text', () => <Button onClick={action('clicked')}>Click</Button>);
