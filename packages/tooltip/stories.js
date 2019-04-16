/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, select, number, boolean } from '@storybook/addon-knobs';

import { TooltipContainer, useTooltip } from './src';
import { GARDEN_PLACEMENTS } from './src/utils/gardenPlacements';

storiesOf('Tooltip Container', module)
  .addDecorator(withKnobs)
  .add('useTooltip', () => {
    const Tooltip = () => {
      const triggerRef = useRef(null);
      const popperRef = useRef(null);

      const { style, placement, getTooltipProps, getTriggerProps } = useTooltip({
        triggerRef,
        popperRef,
        isVisible: boolean('isVisible', false),
        delayMilliseconds: number('Tooltip delay', 500),
        placement: select('Placement', Object.values(GARDEN_PLACEMENTS), 'top')
      });

      const styles = {
        ...style,
        background: '#1f73b7',
        padding: '10px',
        margin: '6px',
        color: '#fff'
      };
      return (
        <>
          <button {...getTriggerProps({ ref: triggerRef })}>Trigger</button>
          <div {...getTooltipProps({ ref: popperRef, style: styles, 'data-placement': placement })}>
            Tooltip
          </div>
        </>
      );
    };

    return <Tooltip />;
  })
  .add('TooltipContainer', () => {
    const Tooltip = () => {
      const triggerRef = useRef(null);
      const popperRef = useRef(null);

      return (
        <TooltipContainer
          triggerRef={triggerRef}
          popperRef={popperRef}
          isVisible={boolean('isVisible', false)}
          delayMilliseconds={number('Tooltip delay', 500)}
          placement={select('Placement', Object.values(GARDEN_PLACEMENTS), 'top')}
        >
          {({ style, placement, getTooltipProps, getTriggerProps }) => {
            const styles = {
              ...style,
              background: '#1f73b7',
              padding: '10px',
              margin: '6px',
              color: '#fff'
            };
            return (
              <>
                <button {...getTriggerProps({ ref: triggerRef })}>Trigger</button>
                <div
                  {...getTooltipProps({
                    ref: popperRef,
                    style: styles,
                    'data-placement': placement
                  })}
                >
                  Tooltip
                </div>
              </>
            );
          }}
        </TooltipContainer>
      );
    };

    return <Tooltip />;
  });
