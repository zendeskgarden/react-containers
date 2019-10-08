/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import { FieldContainer, useField } from './src';
import { generateId } from '@zendeskgarden/container-utilities';

storiesOf('Field Container', module)
  .addDecorator(withKnobs)
  .add('useField', () => {
    const Field = ({ id }: { id: string }) => {
      const { getLabelProps, getInputProps, getHintProps } = useField(id);
      const [value, setVal] = React.useState('');
      const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setVal(event.target.value);

      return (
        <>
          <label {...getLabelProps()}>Accessible Native Input</label>
          <div {...getHintProps()}>Optional Hint</div>
          <input {...getInputProps({ value, onChange }, { isDescribed: true })} />
        </>
      );
    };

    return <Field id={text('id', generateId())} />;
  })
  .add('FieldContainer', () => (
    <FieldContainer id={text('id', generateId())}>
      {({ getLabelProps, getInputProps, getHintProps }) => (
        <>
          <label {...getLabelProps()}>Accessible Native Input</label>
          <div {...getHintProps()}>Optional Hint</div>
          <input {...getInputProps({}, { isDescribed: true })} />
        </>
      )}
    </FieldContainer>
  ));
