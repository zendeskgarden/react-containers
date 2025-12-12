/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';
import userEvent from '@testing-library/user-event';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { KEYS } from '@zendeskgarden/container-utilities';
import { ModalContainer, IUseModalReturnValue } from './';

describe('FocusJailContainer', () => {
  const user = userEvent.setup();

  let onCloseSpy: jest.Mock;
  const MODAL_ID = 'TEST_ID';
  const modalRef: React.RefObject<HTMLDivElement> = createRef();

  const BasicExample = ({ onClose }: { onClose: jest.Mock }) => (
    <ModalContainer modalRef={modalRef} onClose={onClose} idPrefix={MODAL_ID}>
      {({
        getBackdropProps,
        getModalProps,
        getTitleProps,
        getContentProps,
        getCloseProps,
        closeModal
      }: IUseModalReturnValue) => (
        <div data-test-id="backdrop" {...getBackdropProps()}>
          <div data-test-id="modal" {...getModalProps()} ref={modalRef}>
            <div data-test-id="title" {...getTitleProps()}>
              Title
            </div>
            <div data-test-id="content" {...getContentProps()}>
              Modal content
            </div>
            <button
              data-test-id="close"
              {...getCloseProps({ 'aria-label': 'Close modal' })}
              type="button"
            />
            <button onClick={closeModal} data-test-id="additional-close">
              Additional close option
            </button>
            <button data-test-id="button" type="button">
              Non-closing button
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
    it('calls onClose when clicked', async () => {
      const { getByTestId } = render(<BasicExample onClose={onCloseSpy} />);

      await user.click(getByTestId('backdrop'));
      expect(onCloseSpy).toHaveBeenCalled();
    });

    it('does not call onClose when inital click occurs within modal', () => {
      const { getByTestId } = render(<BasicExample onClose={onCloseSpy} />);

      fireEvent.mouseDown(getByTestId('modal'));
      fireEvent.mouseUp(getByTestId('backdrop'));
      expect(onCloseSpy).not.toHaveBeenCalled();
    });
  });

  describe('getModalProps()', () => {
    it('applies accessibility props', () => {
      const { getByRole } = render(<BasicExample onClose={onCloseSpy} />);
      const modal = getByRole('dialog');

      expect(modal).toHaveAttribute('role', 'dialog');
      expect(modal).toHaveAttribute('tabIndex', '-1');
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-labelledby', `${MODAL_ID}__title`);
      expect(modal).toHaveAttribute('aria-describedby', `${MODAL_ID}__content`);
    });

    it('does not trigger onClose when clicked', async () => {
      const { getByTestId } = render(<BasicExample onClose={onCloseSpy} />);

      await user.click(getByTestId('modal'));
      expect(onCloseSpy).not.toHaveBeenCalled();
    });

    describe('onKeyDown', () => {
      it('closes modal when ESC is pressed', () => {
        const { getByRole } = render(<BasicExample onClose={onCloseSpy} />);

        fireEvent.keyDown(getByRole('dialog'), { key: KEYS.ESCAPE });
        expect(onCloseSpy).toHaveBeenCalled();
      });

      it('does not close modal when other keys are pressed', () => {
        const { getByRole } = render(<BasicExample onClose={onCloseSpy} />);

        fireEvent.keyDown(getByRole('dialog'), { key: KEYS.ENTER });
        expect(onCloseSpy).not.toHaveBeenCalled();
      });
    });

    describe('onBlur', () => {
      it('closes modal on blur', async () => {
        render(<BasicExample onClose={onCloseSpy} />);

        await waitFor(async () => {
          await user.click(document.body);
        });

        expect(onCloseSpy).toHaveBeenCalled();
      });

      it('does not close modal when focusing inside modal', async () => {
        const { getByTestId } = render(<BasicExample onClose={onCloseSpy} />);

        await user.click(getByTestId('button'));

        expect(onCloseSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('getTitleProps()', () => {
    it('applies accessibility props', () => {
      const { getByTestId } = render(<BasicExample onClose={onCloseSpy} />);

      expect(getByTestId('title')).toHaveAttribute('id', `${MODAL_ID}__title`);
    });
  });

  describe('getContentProps()', () => {
    it('applies accessibility props', () => {
      const { getByTestId } = render(<BasicExample onClose={onCloseSpy} />);

      expect(getByTestId('content')).toHaveAttribute('id', `${MODAL_ID}__content`);
    });
  });

  describe('getCloseProps()', () => {
    it('applies accessibility props', () => {
      const { getByLabelText } = render(<BasicExample onClose={onCloseSpy} />);

      expect(getByLabelText('Close modal')).toBeVisible();
    });

    it('closes modal onClick', async () => {
      const { getByLabelText } = render(<BasicExample onClose={onCloseSpy} />);

      await user.click(getByLabelText('Close modal'));
      expect(onCloseSpy).toHaveBeenCalled();
    });
  });

  describe('closeModal callback', () => {
    it('triggers onClose if callback is triggered', async () => {
      const { getByText } = render(<BasicExample onClose={onCloseSpy} />);

      await user.click(getByText('Additional close option'));
      expect(onCloseSpy).toHaveBeenCalled();
    });
  });
});
