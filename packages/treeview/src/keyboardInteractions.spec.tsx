/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  handleArrowDown,
  handleArrowLeft,
  handleArrowRight,
  handleArrowUp,
  handleEnd,
  handleHome
} from './keyboardInteractions';

describe('treeview keyboard control utils', () => {
  let onFocusMock: jest.Mock;

  describe('#handleArrowDown', () => {
    it('should not focus on anything when there is no tree element', () => {
      onFocusMock = jest.fn();
      render(
        <div onFocus={onFocusMock}>
          <p data-test-id="test">foobar</p>
        </div>
      );

      const target = screen.getByTestId('test');

      handleArrowDown(target);
      expect(onFocusMock).not.toHaveBeenCalled();
    });
  });

  describe('#handleArrowUp', () => {
    it('should not focus on anything when there is no tree element', () => {
      onFocusMock = jest.fn();
      render(
        <div onFocus={onFocusMock}>
          <p data-test-id="test">foobar</p>
        </div>
      );

      const target = screen.getByTestId('test');

      handleArrowUp(target);
      expect(onFocusMock).not.toHaveBeenCalled();
    });
  });

  describe('#handleArrowLeft', () => {
    it('should focus on the parent node', () => {
      onFocusMock = jest.fn();
      render(
        <div role="treeitem" aria-selected="false" aria-expanded tabIndex={0} onFocus={onFocusMock}>
          <p data-test-id="test">foobar</p>
        </div>
      );

      const target = screen.getByTestId('test');

      handleArrowLeft(target);
      expect(onFocusMock).toHaveBeenCalled();
    });

    it('should not focus on anything when there is no parent node', () => {
      onFocusMock = jest.fn();
      render(
        <div onFocus={onFocusMock}>
          <p data-test-id="test">foobar</p>
        </div>
      );

      const target = screen.getByTestId('test');

      handleArrowLeft(target);
      expect(onFocusMock).not.toHaveBeenCalled();
    });
  });

  describe('#handleArrowRight', () => {
    it('should not focus on anything when there is no parent node', () => {
      onFocusMock = jest.fn();
      render(
        <div onFocus={onFocusMock}>
          <p data-test-id="test">foobar</p>
        </div>
      );

      const target = screen.getByTestId('test');

      handleArrowRight(target);
      expect(onFocusMock).not.toHaveBeenCalled();
    });

    it('should not focus on anything when the active node is the last one', () => {
      onFocusMock = jest.fn();
      render(
        <div onFocus={onFocusMock} role="tree">
          <button role="treeitem" aria-selected="false">
            first
          </button>
          <button data-test-id="test" role="treeitem" aria-selected="false">
            second
          </button>
        </div>
      );

      const target = screen.getByTestId('test');

      handleArrowRight(target);
      expect(onFocusMock).not.toHaveBeenCalled();
    });

    it('should not focus on anything when the active node is expanded', () => {
      onFocusMock = jest.fn();
      render(
        <div onFocus={onFocusMock} role="tree">
          <button data-test-id="test" role="treeitem" aria-selected="false" aria-expanded>
            first
          </button>
          <button role="treeitem" aria-selected="false">
            second
          </button>
        </div>
      );

      const target = screen.getByTestId('test');

      handleArrowRight(target);
      expect(onFocusMock).not.toHaveBeenCalled();
    });
  });

  describe('#handleHome', () => {
    it('should focus on the first treeitem', () => {
      onFocusMock = jest.fn();
      render(
        <div role="tree">
          <p data-test-id="test">foobar</p>
          <button role="treeitem" aria-selected="false" onFocus={onFocusMock}>
            first
          </button>
          <button role="treeitem" aria-selected="false">
            second
          </button>
        </div>
      );

      const target = screen.getByTestId('test');

      handleHome(target);
      expect(onFocusMock).toHaveBeenCalled();
    });

    it('should not focus on anything when there is no tree element', () => {
      onFocusMock = jest.fn();
      render(
        <div onFocus={onFocusMock}>
          <p data-test-id="test">foobar</p>
        </div>
      );

      const target = screen.getByTestId('test');

      handleHome(target);
      expect(onFocusMock).not.toHaveBeenCalled();
    });

    it('should not focus on anything when there the tree is empty', () => {
      onFocusMock = jest.fn();
      render(
        <div role="tree" onFocus={onFocusMock}>
          <p data-test-id="test">foobar</p>
        </div>
      );

      const target = screen.getByTestId('test');

      handleHome(target);
      expect(onFocusMock).not.toHaveBeenCalled();
    });
  });

  describe('#handleEnd', () => {
    it('should focus on the last treeitem', () => {
      onFocusMock = jest.fn();
      render(
        <div role="tree">
          <p data-test-id="test">foobar</p>
          <button role="treeitem" aria-selected="false">
            first
          </button>
          <button role="treeitem" aria-selected="false" onFocus={onFocusMock}>
            second
          </button>
        </div>
      );

      const target = screen.getByTestId('test');

      handleEnd(target);
      expect(onFocusMock).toHaveBeenCalled();
    });

    it('should not focus on anything when there is no tree element', () => {
      onFocusMock = jest.fn();
      render(
        <div onFocus={onFocusMock}>
          <p data-test-id="test">foobar</p>
        </div>
      );

      const target = screen.getByTestId('test');

      handleEnd(target);
      expect(onFocusMock).not.toHaveBeenCalled();
    });

    it('should not focus on anything when there the tree is empty', () => {
      onFocusMock = jest.fn();
      render(
        <div role="tree" onFocus={onFocusMock}>
          <p data-test-id="test">foobar</p>
        </div>
      );

      const target = screen.getByTestId('test');

      handleEnd(target);
      expect(onFocusMock).not.toHaveBeenCalled();
    });

    it('should not focus on anything when the last available node is the target', () => {
      onFocusMock = jest.fn();
      render(
        <div role="tree" onFocus={onFocusMock}>
          <button role="treeitem" aria-selected="false">
            first
          </button>
          <button role="treeitem" aria-selected="false" data-test-id="test">
            second
          </button>
        </div>
      );

      const target = screen.getByTestId('test');

      handleEnd(target);
      expect(onFocusMock).not.toHaveBeenCalled();
    });
  });
});
