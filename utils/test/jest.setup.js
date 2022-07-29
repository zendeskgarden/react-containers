/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import '@testing-library/jest-dom/extend-expect';

import { configure } from '@testing-library/react';

configure({ testIdAttribute: 'data-test-id' });
