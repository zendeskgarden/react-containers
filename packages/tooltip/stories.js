/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';

import { TooltipContainer, useTooltip } from './src';
import { usePopper } from '../../utils/usePopper';

storiesOf('Tooltip Container/useTooltip')
  .addDecorator(withKnobs)
  .add('default', () => {
    const Tooltip = () => {
      const tooltipRef = useRef(null);

      const { isVisible, getTooltipProps, getTriggerProps } = useTooltip({
        tooltipRef,
        isVisible: boolean('isVisible', false),
        delayMilliseconds: number('Tooltip delay', 500)
      });

      const styles = {
        visibility: isVisible ? 'visible' : 'hidden',
        background: '#1f73b7',
        padding: '10px',
        margin: '6px 0',
        color: '#fff'
      };

      return (
        <>
          <button {...getTriggerProps()}>Trigger</button>
          <div
            {...getTooltipProps({
              ref: tooltipRef,
              style: styles
            })}
          >
            Tooltip
          </div>
        </>
      );
    };

    return <Tooltip />;
  })
  .add('positioning via Popper.js', () => {
    const Tooltip = () => {
      const tooltipRef = useRef(null);
      const triggerRef = useRef(null);

      const { isVisible, getTooltipProps, getTriggerProps } = useTooltip({
        tooltipRef,
        isVisible: boolean('isVisible', false),
        delayMilliseconds: number('Tooltip delay', 500)
      });
      const { style } = usePopper({ referenceRef: triggerRef, popperRef: tooltipRef });

      const styles = {
        ...style,
        visibility: isVisible ? 'visible' : 'hidden',
        background: '#1f73b7',
        padding: '10px',
        margin: '6px 0',
        color: '#fff'
      };

      return (
        <>
          <div {...getTooltipProps({ ref: tooltipRef, style: styles })}>Tooltip</div>
          <button {...getTriggerProps({ ref: triggerRef })}>Trigger</button>
        </>
      );
    };

    return <Tooltip />;
  })
  .add('with focusable tooltip', () => {
    const Tooltip = () => {
      const tooltipRef = useRef(null);

      const { isVisible, getTooltipProps, getTriggerProps, openTooltip, closeTooltip } = useTooltip(
        {
          tooltipRef,
          isVisible: boolean('isVisible', false),
          delayMilliseconds: number('Tooltip delay', 500)
        }
      );

      const styles = {
        visibility: isVisible ? 'visible' : 'hidden',
        background: '#000',
        padding: '10px',
        margin: '6px 0',
        color: '#fff'
      };

      return (
        <>
          <button {...getTriggerProps()}>Trigger</button>
          <div
            {...getTooltipProps({
              ref: tooltipRef,
              style: styles,
              onFocus: () => openTooltip(),
              onBlur: () => closeTooltip(0)
            })}
          >
            Focusable tooltip, tab to this <button>button</button>
          </div>
        </>
      );
    };

    return <Tooltip />;
  });

storiesOf('Tooltip Container', module)
  .addDecorator(withKnobs)
  .add('TooltipContainer', () => {
    const Tooltip = () => {
      const tooltipRef = useRef(null);

      return (
        <TooltipContainer
          tooltipRef={tooltipRef}
          isVisible={boolean('isVisible', false)}
          delayMilliseconds={number('Tooltip delay', 500)}
        >
          {({ isVisible, getTooltipProps, getTriggerProps }) => {
            const styles = {
              visibility: isVisible ? 'visible' : 'hidden',
              background: '#1f73b7',
              padding: '10px',
              margin: '6px 0',
              color: '#fff'
            };

            return (
              <>
                <div
                  {...getTooltipProps({
                    ref: tooltipRef,
                    style: styles
                  })}
                >
                  Tooltip
                </div>
                <button {...getTriggerProps()}>Trigger</button>
              </>
            );
          }}
        </TooltipContainer>
      );
    };

    return <Tooltip />;
  });
