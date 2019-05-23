/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import 'jest-dom/extend-expect';

import { configure } from 'react-testing-library';

configure({ testIdAttribute: 'data-test-id' });

// Enable async/await
import '@babel/polyfill';
