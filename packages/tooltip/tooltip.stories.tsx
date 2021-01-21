/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import { TooltipContainer, useTooltip } from './src';
import { usePopper } from '../../utils/usePopper';

export const Container = ({ delayMilliseconds }) => {
  const tooltipRef = useRef(null);

  return (
    <TooltipContainer delayMilliseconds={delayMilliseconds}>
      {({ isVisible, getTooltipProps, getTriggerProps }) => {
        const styles: React.CSSProperties = {
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

export const Hook = ({ delayMilliseconds }) => {
  const tooltipRef = useRef(null);

  const { isVisible, getTooltipProps, getTriggerProps } = useTooltip({
    delayMilliseconds
  });

  const styles: React.CSSProperties = {
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

export const WithPopper = ({ delayMilliseconds }) => {
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);

  const { isVisible, getTooltipProps, getTriggerProps } = useTooltip({
    delayMilliseconds
  });
  const { style } = usePopper({ referenceRef: triggerRef, popperRef: tooltipRef });

  const styles: CSSStyleDeclaration | React.CSSProperties = {
    ...style,
    visibility: isVisible ? 'visible' : 'hidden',
    background: '#1f73b7',
    padding: '10px',
    margin: '6px 0',
    color: '#fff'
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '150px' }}>
      <div {...getTooltipProps({ ref: tooltipRef, style: styles })}>Tooltip</div>
      <button {...(getTriggerProps({ ref: triggerRef }) as any)}>Trigger</button>
    </div>
  );
};

export const FocusableTooltip = ({ delayMilliseconds }) => {
  const tooltipRef = useRef(null);

  const { isVisible, getTooltipProps, getTriggerProps, openTooltip, closeTooltip } = useTooltip({
    delayMilliseconds
  });

  const styles: React.CSSProperties = {
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

Container.storyName = 'TooltipContainer';

Container.args = {
  delayMilliseconds: 500
};

Hook.storyName = 'useTooltip';

Hook.args = {
  delayMilliseconds: 500
};

Hook.parameters = {
  docs: {
    description: {
      story: `The \`useTooltip\` hook implements the [tooltip pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#tooltip) and can be used to build a tooltip component.`
    }
  }
};

WithPopper.storyName = 'positioning via Popper.js';

WithPopper.args = {
  delayMilliseconds: 500
};

WithPopper.parameters = {
  docs: {
    description: {
      story: `This story demonstrate the \`useTooltip\` hook in combination with Popper.js for positioning. And it's broken`
    }
  }
};

FocusableTooltip.storyName = 'with focusable tooltip';

FocusableTooltip.args = {
  delayMilliseconds: 500
};

FocusableTooltip.parameters = {
  docs: { description: { story: `This story demonstrates focusable content within the tooltip.` } }
};

export default {
  title: 'Tooltip Container',
  component: TooltipContainer,
  parameters: {
    layout: 'centered',
    componentSubtitle: `A container component which wraps the useTooltip hook.`
  }
};
