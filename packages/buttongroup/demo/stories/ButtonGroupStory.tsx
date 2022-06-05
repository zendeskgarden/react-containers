/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef, RefObject } from 'react';
import { Story } from '@storybook/react';
import classNames from 'classnames';
import {
  ButtonGroupContainer,
  IButtonGroupContainerProps,
  IUseButtonGroupProps,
  IUseButtonGroupReturnValue,
  useButtonGroup
} from '@zendeskgarden/container-buttongroup';

interface IComponentProps extends IUseButtonGroupReturnValue<string> {
  buttons: RefObject<HTMLButtonElement>[];
}

const Component = ({ getGroupProps, getButtonProps, selectedItem, buttons }: IComponentProps) => (
  <div {...getGroupProps()}>
    {buttons.map((button, index) => (
      <button
        key={index}
        className={classNames('border', 'px-2', 'py-1', 'rounded-none', {
          'bg-blue-300': index.toString() === selectedItem
        })}
        {...getButtonProps({ item: index.toString(), focusRef: button })}
        type="button"
      >{`Button ${index + 1}`}</button>
    ))}
  </div>
);

interface IProps extends IUseButtonGroupProps<string> {
  buttonRefs: RefObject<HTMLButtonElement>[];
}

const Container = ({ buttonRefs, ...props }: IProps) => (
  <ButtonGroupContainer {...props}>
    {containerProps => <Component buttons={buttonRefs} {...containerProps} />}
  </ButtonGroupContainer>
);

const Hook = ({ buttonRefs, ...props }: IProps) => {
  const hookProps = useButtonGroup(props);

  return <Component buttons={buttonRefs} {...hookProps} />;
};

interface IArgs extends IButtonGroupContainerProps<string> {
  as: 'hook' | 'container';
  buttons: number;
}

export const ButtonGroupStory: Story<IArgs> = ({ as, buttons, ...props }: IArgs) => {
  const buttonRefs = Array.from({ length: buttons }, () => createRef<HTMLButtonElement>());

  switch (as) {
    case 'container':
      return <Container buttonRefs={buttonRefs} {...props} />;

    case 'hook':
    default:
      return <Hook buttonRefs={buttonRefs} {...props} />;
  }
};
