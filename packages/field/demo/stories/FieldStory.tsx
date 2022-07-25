/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story } from '@storybook/react';
import {
  FieldContainer,
  IFieldContainerProps,
  IUseFieldPropGetters,
  useField
} from '@zendeskgarden/container-field';

interface IComponentProps extends IUseFieldPropGetters {
  isDescribed: boolean;
  hasMessage: boolean;
}

const Component = ({
  getLabelProps,
  getHintProps,
  getInputProps,
  getMessageProps,
  isDescribed,
  hasMessage
}: IComponentProps) => (
  /* eslint-disable jsx-a11y/label-has-associated-control */
  <>
    <label {...getLabelProps()}>Label</label>
    {isDescribed && <div {...getHintProps()}>Hint</div>}
    <input {...getInputProps({}, { isDescribed, hasMessage })} />
    {hasMessage && <div {...getMessageProps()}>Message</div>}
  </>
);

interface IProps {
  id?: NonNullable<IFieldContainerProps['id']>;
  isDescribed: boolean;
  hasMessage: boolean;
}

const Container = ({ id, isDescribed, hasMessage }: IProps) => (
  <FieldContainer id={id}>
    {containerProps => (
      <Component isDescribed={isDescribed} hasMessage={hasMessage} {...containerProps} />
    )}
  </FieldContainer>
);

const Hook = ({ id, isDescribed, hasMessage }: IProps) => {
  const hookProps = useField(id);

  return <Component isDescribed={isDescribed} hasMessage={hasMessage} {...hookProps} />;
};

interface IArgs extends IFieldContainerProps {
  as: 'hook' | 'container';
  isDescribed: boolean;
  hasMessage: boolean;
}

export const FieldStory: Story<IArgs> = ({ as, ...props }) => {
  const Field = () => {
    switch (as) {
      case 'container':
        return <Container {...props} />;

      case 'hook':
      default:
        return <Hook {...props} />;
    }
  };

  return <Field />;
};
