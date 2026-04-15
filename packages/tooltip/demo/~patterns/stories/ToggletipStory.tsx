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

export const ToggletipStory: StoryFn = () => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { getTooltipProps, getTriggerProps, isVisible, isAnnouncementReady } = useTooltip({
    triggerRef,
    isToggletip: true
  });

  return (
    <div className="relative">
      <span
        className={classNames(
          'absolute',
          '-top-24',
          'start-2',
          'bg-grey-800',
          'inline-block',
          'mb-1',
          'px-4',
          'py-2',
          'rounded-sm',
          'text-sm',
          'text-white',
          isVisible ? 'visible' : 'invisible'
        )}
        {...getTooltipProps()}
      >
        {isAnnouncementReady ? 'Use this space to provide more context for your users.' : null}
      </span>
      <button
        className="bg-grey-200 border border-solid cursor-pointer px-3 py-2 rounded"
        {...getTriggerProps()}
        type="button"
      >
        More information
      </button>
    </div>
  );
};
