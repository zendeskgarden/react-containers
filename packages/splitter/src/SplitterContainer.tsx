/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  useSplitter,
  IUseSplitterProps,
  IUseSplitterReturnValue,
  SplitterOrientation,
  SplitterType,
  SplitterPosition
} from './useSplitter';

export interface ISplitterContainerProps extends IUseSplitterProps {
  /** Documents the render function */
  render?: (options: IUseSplitterReturnValue) => React.ReactNode;
  /** Documents the children prop */
  children?: (options: IUseSplitterReturnValue) => React.ReactNode;
}

export const SplitterContainer: React.FC<ISplitterContainerProps> = props => {
  const { children, render = children, ...options } = props;

  return <>{render!(useSplitter(options)) as React.ReactElement}</>;
};

SplitterContainer.propTypes = {
  ariaLabel: PropTypes.string,
  children: PropTypes.func,
  render: PropTypes.func,
  windowObject: PropTypes.oneOfType([
    PropTypes.shape({
      scrollX: PropTypes.number.isRequired,
      scrollY: PropTypes.number.isRequired,
      document: PropTypes.oneOfType([
        PropTypes.instanceOf(Document),
        PropTypes.shape({
          addEventListener: PropTypes.func.isRequired,
          removeEventListener: PropTypes.func.isRequired,
          body: PropTypes.shape({
            clientWidth: PropTypes.number.isRequired,
            clientHeight: PropTypes.number.isRequired,
            addEventListener: PropTypes.func.isRequired,
            removeEventListener: PropTypes.func.isRequired
          }).isRequired
        })
      ]).isRequired
    })
  ]),
  orientation: PropTypes.oneOf([SplitterOrientation.VERTICAL, SplitterOrientation.HORIZONTAL])
    .isRequired,
  keyboardStep: PropTypes.number,
  type: PropTypes.oneOf([SplitterType.FIXED, SplitterType.VARIABLE]).isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  defaultValueNow: PropTypes.number,
  valueNow: PropTypes.number,
  onChange: PropTypes.func,
  position: PropTypes.oneOf([SplitterPosition.LEADS, SplitterPosition.TRAILS]).isRequired,
  rtl: PropTypes.bool
};
