/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { StoryFn } from '@storybook/react';
import {
  FieldContainer,
  IFieldContainerProps,
  IUseFieldProps,
  IUseFieldReturnValue,
  useField
} from '@zendeskgarden/container-field';

interface IComponentProps extends IUseFieldReturnValue {
  hasHint?: boolean;
  hasMessage?: boolean;
}

const Component = ({
  getLabelProps,
  getHintProps,
  getInputProps,
  getMessageProps,
  hasHint,
  hasMessage
}: IComponentProps) => (
  /* eslint-disable jsx-a11y/label-has-associated-control */
  <>
    <label {...getLabelProps()}>Label</label>
    {hasHint && <div {...getHintProps()}>Hint</div>}
    <input {...getInputProps()} />
    {hasMessage && <div {...getMessageProps()}>Message</div>}
  </>
);

const Container = ({ hasHint, hasMessage, ...props }: IFieldContainerProps) => (
  <FieldContainer hasHint={hasHint} hasMessage={hasMessage} {...props}>
    {containerProps => <Component {...containerProps} hasHint={hasHint} hasMessage={hasMessage} />}
  </FieldContainer>
);

const Hook = ({ hasHint, hasMessage, ...props }: IUseFieldProps) => {
  const hookProps = useField({ hasHint, hasMessage, ...props });

  return <Component {...hookProps} hasHint={hasHint} hasMessage={hasMessage} />;
};

interface IArgs extends IFieldContainerProps {
  as: 'hook' | 'container';
}

export const FieldStory: StoryFn<IArgs> = ({ as, ...props }) => {
  switch (as) {
    case 'container':
      return <Container {...props} />;

    case 'hook':
    default:
      return <Hook {...props} />;
  }
};
