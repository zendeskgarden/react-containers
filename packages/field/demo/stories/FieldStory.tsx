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
  containsMessage: boolean;
}

const Component = ({
  getLabelProps,
  getHintProps,
  getInputProps,
  getMessageProps,
  isDescribed,
  containsMessage
}: IComponentProps) => (
  /* eslint-disable jsx-a11y/label-has-associated-control */
  <>
    <label {...getLabelProps()}>Label</label>
    {isDescribed && <div {...getHintProps()}>Hint</div>}
    <input {...getInputProps({}, { isDescribed, containsMessage })} />
    {containsMessage && <div {...getMessageProps()}>Message</div>}
  </>
);

interface IProps {
  id?: NonNullable<IFieldContainerProps['id']>;
  isDescribed: boolean;
  containsMessage: boolean;
}

const Container = ({ id, isDescribed, containsMessage }: IProps) => (
  <FieldContainer id={id}>
    {containerProps => (
      <Component isDescribed={isDescribed} containsMessage={containsMessage} {...containerProps} />
    )}
  </FieldContainer>
);

const Hook = ({ id, isDescribed, containsMessage }: IProps) => {
  const hookProps = useField(id);

  return <Component isDescribed={isDescribed} containsMessage={containsMessage} {...hookProps} />;
};

interface IArgs extends IFieldContainerProps {
  as: 'hook' | 'container';
  isDescribed: boolean;
  containsMessage: boolean;
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
