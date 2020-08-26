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

Container.storyName = 'FieldContainer';

Hook.storyName = 'useField';

Hook.parameters = {
  docs: {
    description: {
      story: `The \`useField\` hook will supply the prop getters to handle \`aria-labelledby\` along
      with for/id mapping and \`aria-describedby\` mapping when a hint is applied.`
    }
  }
};

export default {
  title: 'Field Container',
  decorators: [withKnobs],
  component: FieldContainer,
  parameters: {
    layout: 'centered',
    componentSubtitle: `A container component which wraps the useField hook.`
  }
};
