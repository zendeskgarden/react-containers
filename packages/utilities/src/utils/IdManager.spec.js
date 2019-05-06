/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { generateId, setIdCounter } from './IdManager';

describe('IdManager', () => {
  beforeEach(() => {
    setIdCounter(0);
  });

  describe('generateId()', () => {
    it('provides unique id based on number of calls', () => {
      expect(generateId()).toBe('garden-0');
    });

    it('provides unique id with unique prefix if provided', () => {
      expect(generateId('customPrefix')).toBe('customPrefix-0');
    });
  });

  describe('setIdCounter()', () => {
    it('sets global id counter to number provided', () => {
      setIdCounter(25);

      expect(generateId()).toBe('garden-25');
    });
  });
});
