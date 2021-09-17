/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { SplitterContainer, IUseSplitterProps, IUseSplitterReturnValue, useSplitter } from './src';

const ARGS = {
  label: 'test'
};

const flexContainerStyle: React.CSSProperties = {
  minHeight: '200px',
  display: 'flex'
};

const separatorStyle: React.CSSProperties = {
  display: 'block',
  backgroundColor: 'black',
  height: 'auto',
  cursor: 'col-resize',
  marginLeft: '20px',
  marginRight: '20px'
};

const paneStyle: React.CSSProperties = {};

export const Container = ({ label }) => (
  <SplitterContainer>
    {({ getPaneProps, getSeparatorProps }: IUseSplitterReturnValue) => (
      <div style={flexContainerStyle}>
        <div {...getPaneProps({ style: paneStyle })}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, repellat asperiores! Quas
          tempore magni aperiam deleniti rerum officia numquam? At dolore numquam ea. Placeat,
          voluptatem molestias quibusdam veritatis vitae earum.
        </div>
        <div {...getSeparatorProps({ label, style: separatorStyle })} />
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel praesentium, sed suscipit
          dolore fugit voluptates dignissimos magnam dolorem beatae quisquam! Necessitatibus saepe,
          tenetur dicta a harum sapiente ea culpa provident!
        </div>
      </div>
    )}
  </SplitterContainer>
);

Container.storyName = 'SplitterContainer';
Container.args = ARGS;

export const Hook = ({ label, text }) => {
  const Splitter = (props: IUseSplitterProps) => {
    const { getPaneProps } = useSplitter(props);

    return <div {...getPaneProps()}>{text}</div>;
  };

  return <Splitter label={label} />;
};

Hook.storyName = 'useSplitter';
Hook.args = ARGS;

export default {
  component: SplitterContainer,
  title: 'Splitter Container',
  parameters: {
    layout: 'centered',
    componentSubtitle: `A container component which wraps the useSplitter hook.`
  }
};
