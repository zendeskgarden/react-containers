/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { mount } from 'enzyme';

import { ExampleContainer } from './ExampleContainer';

describe('ExampleContainer', () => {
  let wrapper;

  const basicExample = () => (
    <ExampleContainer>
      {({ getCoolProps }) => <div {...getCoolProps({ 'data-test-id': 'div' })} />}
    </ExampleContainer>
  );

  beforeEach(() => {
    wrapper = mount(basicExample());
  });

  const findDiv = enzymeWrapper => enzymeWrapper.find('[data-test-id="div"]');

  describe('getCoolProps', () => {
    it('applies correct accessibility role', () => {
      const div = findDiv(wrapper);

      expect(div).toHaveProp('cool', true);
    });
  });
});
