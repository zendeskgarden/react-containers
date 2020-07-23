/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { uid } from 'react-uid';
import { withKnobs, text } from '@storybook/addon-knobs';

import { FieldContainer, useField } from './src';

export const Hook = () => {
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

  return <Field id={text('id', uid({ name: 'useField' }))} />;
};

export const Container = () => (
  <FieldContainer id={text('id', uid({ name: 'FieldContainer' }))}>
    {({ getLabelProps, getInputProps, getHintProps }) => (
      <>
        <label {...getLabelProps()}>Accessible Native Input</label>
        <div {...getHintProps()}>Optional Hint</div>
        <input {...getInputProps({}, { isDescribed: true })} />
      </>
    )}
  </FieldContainer>
);

Hook.story = {
  name: 'useField'
};

Container.story = {
  name: 'FieldContainer'
};

export default {
  title: 'Field Container',
  decorators: [withKnobs]
};
