/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { forwardRef, HTMLAttributes } from 'react';
import { Story } from '@storybook/react';
import {
  IModalContainerProps,
  IUseModalProps,
  IUseModalReturnValue,
  ModalContainer,
  useModal
} from '@zendeskgarden/container-modal';

interface IComponentProps extends IUseModalReturnValue {
  isOpen: boolean;
  onOpen: HTMLAttributes<HTMLElement>['onClick'];
}

const Component = forwardRef<HTMLDivElement, IComponentProps>(
  (
    {
      isOpen,
      onOpen,
      getBackdropProps,
      getModalProps,
      getTitleProps,
      getContentProps,
      getCloseProps
    },
    ref
  ) => (
    <div className="flex items-center" style={{ minHeight: 240 }}>
      <button className="px-2 py-1" type="button" onClick={onOpen}>
        Open
      </button>
      {isOpen && (
        <div
          className="absolute bg-grey-700 flex top-0 right-0 bottom-0 left-0 items-center justify-center"
          {...getBackdropProps()}
        >
          <div
            className="bg-white border border-solid p-6 relative rounded"
            {...getModalProps()}
            ref={ref}
          >
            <h1 className="mb-3 text-lg" {...getTitleProps()}>
              Modal
            </h1>
            <div {...getContentProps()}>
              <label>
                <span>Tabbable</span>
                <input className="block mb-2" />
              </label>
              <label>
                <span>Tabbable</span>
                <input className="block mb-2" />
              </label>
              <button className="mt-2 px-2 py-1" type="button">
                Tabbable
              </button>
            </div>
            <button
              className="absolute bg-transparent border-none h-6 w-6 top-4 right-4"
              {...getCloseProps()}
              type="button"
            >
              ❎
            </button>
          </div>
        </div>
      )}
    </div>
  )
);

Component.displayName = 'Component';

interface IProps extends IUseModalProps<HTMLDivElement> {
  isOpen: boolean;
  onOpen: HTMLAttributes<HTMLDivElement>['onClick'];
}

const Container = ({ isOpen, onOpen, modalRef, ...props }: IProps) => (
  <ModalContainer modalRef={modalRef} {...props}>
    {containerProps => (
      <Component isOpen={isOpen} onOpen={onOpen} {...containerProps} ref={modalRef} />
    )}
  </ModalContainer>
);

const Hook = ({ isOpen, onOpen, modalRef, ...props }: IProps) => {
  const hookProps = useModal({ modalRef, ...props });

  return <Component isOpen={isOpen} onOpen={onOpen} {...hookProps} ref={modalRef} />;
};

interface IArgs extends IModalContainerProps<HTMLDivElement> {
  as: 'hook' | 'container';
  isOpen: boolean;
  onOpen: HTMLAttributes<HTMLDivElement>['onClick'];
}

export const ModalStory: Story<IArgs> = ({ as, ...props }) => {
  switch (as) {
    case 'container':
      return <Container {...props} />;

    case 'hook':
    default:
      return <Hook {...props} />;
  }
};
