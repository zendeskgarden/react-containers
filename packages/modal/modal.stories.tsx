/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState, useRef } from 'react';

import { withKnobs, boolean } from '@storybook/addon-knobs';

import { ModalContainer, useModal } from './src';

export const Hook = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const restoreFocus = boolean('restoreFocus', true);
  const modalRef = useRef(null);
  const {
    getBackdropProps,
    getModalProps,
    getTitleProps,
    getContentProps,
    getCloseProps
  } = useModal({ onClose: () => setModalVisibility(false), modalRef, restoreFocus });

  return (
    <>
      <button onClick={() => setModalVisibility(!isModalVisible)}>Open Modal</button>
      {isModalVisible && (
        <div
          {...getBackdropProps({
            style: {
              background: 'rgba(0,0,0,0.2)',
              position: 'fixed',
              top: '0',
              right: '0',
              bottom: '0',
              left: '0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }
          })}
        >
          <div
            {...getModalProps({
              ref: modalRef,
              style: {
                padding: '20px',
                background: '#fff',
                minWidth: '500px',
                minHeight: '400px',
                position: 'relative'
              }
            })}
          >
            <h1 {...getTitleProps()}>Example header</h1>
            <section {...getContentProps()}>
              <p>Modal contents</p>
              <input placeholder="focusable content" />
              <button>Submit</button>
            </section>
            <button
              {...(getCloseProps({
                'aria-label': 'Schließen Sie Modal',
                style: { position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }
              }) as any)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const Container = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const modalRef = useRef(null);

  return (
    <>
      <button onClick={() => setModalVisibility(!isModalVisible)}>Open Modal</button>
      <ModalContainer modalRef={modalRef} onClose={() => setModalVisibility(false)}>
        {({ getBackdropProps, getModalProps, getTitleProps, getContentProps, getCloseProps }) => {
          return (
            isModalVisible && (
              <div
                {...getBackdropProps({
                  style: {
                    background: 'rgba(0,0,0,0.2)',
                    position: 'fixed',
                    top: '0',
                    right: '0',
                    bottom: '0',
                    left: '0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }
                })}
              >
                <div
                  {...getModalProps({
                    ref: modalRef,
                    style: {
                      padding: '20px',
                      background: '#fff',
                      minWidth: '500px',
                      minHeight: '400px',
                      position: 'relative'
                    }
                  })}
                >
                  <h1 {...getTitleProps()}>Example header</h1>
                  <section {...getContentProps()}>
                    <p>Modal contents</p>
                    <input placeholder="focusable content" />
                    <button>Submit</button>
                  </section>
                  <button
                    {...(getCloseProps({
                      'aria-label': 'Schließen Sie Modal',
                      style: {
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        cursor: 'pointer'
                      }
                    }) as any)}
                  >
                    X
                  </button>
                </div>
              </div>
            )
          );
        }}
      </ModalContainer>
    </>
  );
};

Hook.story = {
  name: 'useModal'
};

Container.story = {
  name: 'ModalContainer'
};

export default {
  title: 'Modal Container',
  decorators: [withKnobs]
};
