/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';

import { useField, IUseFieldPropGetters } from './useField';

export interface IFieldContainerProps {
  render?: (options: IUseFieldPropGetters) => React.ReactNode;
  children?: (options: IUseFieldPropGetters) => React.ReactNode;
  id?: string;
}

export const FieldContainer: React.FunctionComponent<IFieldContainerProps> = ({
  children,
  render = children,
  id
}) => {
  return render!(useField(id)) as React.ReactElement;
};

FieldContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  id: PropTypes.string
};
