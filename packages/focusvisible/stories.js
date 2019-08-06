/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { useFocusVisible, FocusVisibleContainer } from './src';
import { useSelection } from '../selection/src';

const StyledCustomFocus = styled.div`
  :focus {
    outline: none;
  }

  &[data-garden-focus-visible] {
    outline: 2px dashed red;
  }
`;

const StyledWrapper = styled.div`
  * {
    margin-bottom: 8px;
  }
`;

storiesOf('FocusVisible Container', module)
  .addDecorator(withKnobs)
  .add('useFocusVisible', () => {
    const Example = () => {
      const ref = useRef();

      useFocusVisible({ scope: ref });

      return (
        <StyledWrapper ref={ref}>
          <div>
            <StyledCustomFocus as="button">Customized Button Focus</StyledCustomFocus>
          </div>
          <div>
            <StyledCustomFocus
              as="input"
              placeholder="Always shows focus"
              aria-label="Example input"
            />
          </div>
          <div>
            <StyledCustomFocus tabIndex="0">
              <p>Focusable div content only shows focus with keyboard interaction</p>
            </StyledCustomFocus>
          </div>
          <div>
            <StyledCustomFocus
              as="textarea"
              placeholder="Always shows focus"
              aria-label="Example textarea"
            />
          </div>
          <div>
            <label>
              <StyledCustomFocus as="input" type="checkbox" />
              Only shows focus when keyed to
            </label>
          </div>
        </StyledWrapper>
      );
    };

    return <Example />;
  })
  .add('Usage with useSelection', () => {
    const items = ['One', 'Two', 'Three'];

    const StyledExampleContainer = styled.ul`
      display: flex;
    `;

    const StyledExampleItem = styled(StyledCustomFocus).attrs({ as: 'li' })`
      list-style: none;
      margin: 16px;
      padding: 8px;
      text-align: center;
      cursor: pointer;

      ${props => props.isSelected && `border-bottom: 4px solid blue`}
    `;

    const Selection = () => {
      const { selectedItem, getContainerProps, getItemProps } = useSelection({
        defaultSelectedIndex: 0
      });
      const ref = useRef();

      useFocusVisible({ scope: ref });

      return (
        <StyledExampleContainer {...getContainerProps({ ref })}>
          {items.map(item => {
            const itemRef = React.createRef();
            const isSelected = selectedItem === item;

            return (
              <StyledExampleItem
                {...getItemProps({
                  key: item,
                  item,
                  focusRef: itemRef,
                  isSelected
                })}
              >
                {item}
              </StyledExampleItem>
            );
          })}
        </StyledExampleContainer>
      );
    };

    return <Selection />;
  })
  .add('FocusVisibleContainer', () => {
    const Example = () => {
      const ref = useRef();

      return (
        <FocusVisibleContainer scope={ref}>
          <StyledWrapper ref={ref}>
            <div>
              <StyledCustomFocus as="button">Hello world</StyledCustomFocus>
            </div>
            <div>
              <StyledCustomFocus as="input" />
            </div>
          </StyledWrapper>
        </FocusVisibleContainer>
      );
    };

    return <Example />;
  });
