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
  useButtonGroup,
  UseButtonGroupReturnValue
} from '@zendeskgarden/container-buttongroup';

interface IComponentProps extends UseButtonGroupReturnValue<any> {
  buttons: RefObject<any>[];
}

const Component = ({ getGroupProps, getButtonProps, selectedItem, buttons }: IComponentProps) => (
  <div {...getGroupProps()}>
    {buttons.map((button, index) => (
      <button
        key={button}
        className={classNames({
          'bg-blue-300': button === selectedItem,
          border: true,
          'px-2': true,
          'py-1': true,
          'rounded-none': true
        })}
        type="button"
        {...getButtonProps({ item: button, focusRef: button })}
      >{`Button ${index + 1}`}</button>
    ))}
  </div>
);

interface IProps extends IUseButtonGroupProps<any> {
  buttons: RefObject<any>[];
}

const Container = ({ buttons, ...props }: IProps) => (
  <ButtonGroupContainer {...props}>
    {containerProps => <Component buttons={buttons} {...containerProps} />}
  </ButtonGroupContainer>
);

const Hook = ({ buttons, ...props }: IProps) => {
  const hookProps = useButtonGroup(props);

  return <Component buttons={buttons} {...hookProps} />;
};

interface IArgs extends IButtonGroupContainerProps<any> {
  as: 'hook' | 'container';
  buttons: number;
}

export const ButtonGroupStory: Story<IArgs> = ({ as, buttons, ...props }: IArgs) => {
  const _buttons = Array.from({ length: buttons }, () => createRef());

  switch (as) {
    case 'container':
      return <Container buttons={_buttons} {...props} />;

    case 'hook':
    default:
      return <Hook buttons={_buttons} {...props} />;
  }
};
