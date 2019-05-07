/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { mount } from 'enzyme';

import AccordionContainer from './AccordionContainer';

describe('AccordionContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<AccordionContainer />);
  });

  describe('getSectionProps()', () => {
    console.log(wrapper);
  });
});
