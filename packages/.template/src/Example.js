/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ExampleContainer extends Component {
  static propTypes = {
    coolProp: PropTypes.bool
  };

  getCoolProps = ({ coolProp = 'cool', ...other }) => ({ coolProp, ...other });

  render() {
    const { children, render = children } = this.props;

    render({
      getCoolProps: props => this.getCoolProps(prop)
    });
  }
}
