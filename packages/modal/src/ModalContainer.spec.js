/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { KEY_CODES } from '@zendeskgarden/container-utilities';
import { ModalContainer } from './ModalContainer';

describe('FocusJailContainer', () => {
  let onCloseSpy;
  const MODAL_ID = 'TEST_ID';
  const modalRef = createRef(null);

  const BasicExample = ({ onClose }) => (
    <ModalContainer modalRef={modalRef} onClose={onClose} id={MODAL_ID}>
      {({
        getBackdropProps,
        getModalProps,
        getTitleProps,
        getContentProps,
        getCloseProps,
        closeModal
      }) => (
        <div {...getBackdropProps({ 'data-test-id': 'backdrop' })}>
          <div {...getModalProps({ 'data-test-id': 'modal' })} ref={modalRef}>
            <div {...getTitleProps({ 'data-test-id': 'title' })}>Title</div>
            <div {...getContentProps({ 'data-test-id': 'content' })}>Modal content</div>
            <button {...getCloseProps({ 'data-test-id': 'close' })} />
            <button onClick={closeModal} data-test-id="additional-close">
              Additional close option
            </button>
          </div>
        </div>
      )}
    </ModalContainer>
  );

  beforeEach(() => {
    onCloseSpy = jest.fn();
  });

  describe('getBackdropProps()', () => {
    it('calls onClose when clicked', () => {
      const { getByTestId } = render(<BasicExample onClose={onCloseSpy} />);

      fireEvent.click(getByTestId('backdrop'));
      expect(onCloseSpy).toHaveBeenCalled();
    });
  });

  describe('getModalProps()', () => {
    it('applies accessibility props', () => {
      const { getByTestId } = render(<BasicExample onClose={onCloseSpy} />);
      const modal = getByTestId('modal');

      expect(modal).toHaveAttribute('role', 'dialog');
      expect(modal).toHaveAttribute('tabIndex', '-1');
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-labelledby', `${MODAL_ID}--title`);
      expect(modal).toHaveAttribute('aria-describedby', `${MODAL_ID}--content`);
    });

    it('does not trigger onClose when clicked', () => {
      const { getByTestId } = render(<BasicExample onClose={onCloseSpy} />);

      fireEvent.click(getByTestId('modal'));
      expect(onCloseSpy).not.toHaveBeenCalled();
    });

    describe('onKeyDown', () => {
      it('closes modal when ESC is pressed', () => {
        const { getByTestId } = render(<BasicExample onClose={onCloseSpy} />);

        fireEvent.keyDown(getByTestId('modal'), { keyCode: KEY_CODES.ESCAPE });
        expect(onCloseSpy).toHaveBeenCalled();
      });

      it('does not close modal when other keys are pressed', () => {
        const { getByTestId } = render(<BasicExample onClose={onCloseSpy} />);

        fireEvent.keyDown(getByTestId('modal'), { keyCode: KEY_CODES.ENTER });
        expect(onCloseSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('getTitleProps()', () => {
    it('applies accessibility props', () => {
      const { getByTestId } = render(<BasicExample onClose={onCloseSpy} />);

      expect(getByTestId('title')).toHaveAttribute('id', `${MODAL_ID}--title`);
    });
  });

  describe('getContentProps()', () => {
    it('applies accessibility props', () => {
      const { getByTestId } = render(<BasicExample onClose={onCloseSpy} />);

      expect(getByTestId('content')).toHaveAttribute('id', `${MODAL_ID}--content`);
    });
  });

  describe('getCloseProps()', () => {
    it('applies accessibility props', () => {
      const { getByTestId } = render(<BasicExample onClose={onCloseSpy} />);

      expect(getByTestId('close')).toHaveAttribute('aria-label', 'Close modal');
    });

    it('closes modal onClick', () => {
      const { getByTestId } = render(<BasicExample onClose={onCloseSpy} />);

      fireEvent.click(getByTestId('close'));
      expect(onCloseSpy).toHaveBeenCalled();
    });
  });

  describe('closeModal callback', () => {
    it('triggers onClose if callback is triggered', () => {
      const { getByTestId } = render(<BasicExample onClose={onCloseSpy} />);

      fireEvent.click(getByTestId('additional-close'));
      expect(onCloseSpy).toHaveBeenCalled();
    });
  });
});
