/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import { withA11y } from '@storybook/addon-a11y';

addDecorator(centered);
addDecorator(withA11y);
