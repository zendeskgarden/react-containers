/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story } from '@storybook/react';
import classNames from 'classnames';
import {
  ITooltipContainerProps,
  IUseTooltipProps,
  IUseTooltipReturnValue,
  TooltipContainer,
  useTooltip
} from '@zendeskgarden/container-tooltip';

const Component = ({ getTooltipProps, getTriggerProps, isVisible }: IUseTooltipReturnValue) => (
  <>
    <span
      className={classNames(
        'bg-grey-800',
        'inline-block',
        'mb-1',
        'px-2',
        'py-0.5',
        'rounded-sm',
        'text-sm',
        'text-white',
        isVisible ? 'visible' : 'invisible'
      )}
      {...getTooltipProps()}
    >
      Tooltip
    </span>
    <div
      className="bg-grey-200 border border-solid cursor-pointer px-3 py-2 rounded"
      {...getTriggerProps()}
    >
      Trigger
    </div>
  </>
);

const Container = (props: IUseTooltipProps) => (
  <TooltipContainer {...props}>
    {containerProps => <Component {...containerProps} />}
  </TooltipContainer>
);

const Hook = (props: IUseTooltipProps) => {
  const hookProps = useTooltip(props);

  return <Component {...hookProps} />;
};

interface IArgs extends ITooltipContainerProps {
  as: 'hook' | 'container';
}

export const TooltipStory: Story<IArgs> = ({ as, ...props }) => {
  const Tooltip = () => {
    switch (as) {
      case 'container':
        return <Container {...props} />;

      case 'hook':
      default:
        return <Hook {...props} />;
    }
  };

  return <Tooltip />;
};
