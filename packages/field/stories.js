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

storiesOf('Field Container', module)
  .addDecorator(withKnobs)
  .add('useField', () => {
    // eslint-disable-next-line react/prop-types
    const Field = ({ id }) => {
      const { getLabelProps, getInputProps, getHintProps } = useField(id);
      const [value, setVal] = React.useState('');

      return (
        <>
          <label {...getLabelProps()}>Accessible Native Input</label>
          <div {...getHintProps()}>Optional Hint</div>
          <input
            {...getInputProps(
              { value, onChange: ({ target }) => setVal(target.value) },
              { isDescribed: true }
            )}
          />
        </>
      );
    };

    return <Field id={text('id')} />;
  })
  .add('FieldContainer', () => (
    <FieldContainer id={text('id')}>
      {({ getLabelProps, getInputProps, getHintProps }) => (
        <>
          <label {...getLabelProps()}>Accessible Native Input</label>
          <div {...getHintProps()}>Optional Hint</div>
          <input {...getInputProps({}, { isDescribed: true })} />
        </>
      )}
    </FieldContainer>
  ));
