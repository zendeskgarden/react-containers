/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import { StoryFn } from '@storybook/react';
import classNames from 'classnames';
import { useTooltip } from '@zendeskgarden/container-tooltip';

export const FocusStory: StoryFn = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const { getTooltipProps, getTriggerProps, isVisible, openTooltip, closeTooltip } = useTooltip({
    triggerRef
  });
  const onFocus = () => openTooltip();
  const onBlur = () => closeTooltip(0);

  return (
    <>
      <div
        className="bg-grey-200 border border-solid cursor-pointer px-3 py-2 rounded"
        {...getTriggerProps()}
      >
        Trigger, then tab to the tooltip &lt;button&gt;
      </div>
      <div
        className={classNames(
          'bg-grey-800',
          'inline-block',
          'mt-1',
          'px-2',
          'rounded-sm',
          'text-sm',
          'text-white',
          isVisible ? 'visible' : 'invisible'
        )}
        {...getTooltipProps({ onFocus, onBlur })}
      >
        Tooltip with{' '}
        <button className="bg-grey-600 border border-solid border-grey-500 m-1 py-0.5 px-1 rounded-sm text-white">
          tabbable
        </button>{' '}
        focus
      </div>
    </>
  );
};
