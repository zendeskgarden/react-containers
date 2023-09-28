/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import '@testing-library/jest-dom/extend-expect';
/* eslint-disable-next-line */
import { TextEncoder } from 'util';
import { configure } from '@testing-library/react';

Object.assign(global, { TextEncoder });

configure({ testIdAttribute: 'data-test-id' });
