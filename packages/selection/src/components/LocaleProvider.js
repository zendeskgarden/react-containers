/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';

export const LocaleContext = React.createContext({ rtl: false });

/**
 * LocaleProvider component to apply global locale settings
 */
function LocaleProvider({ rtl = false, children } = {}) {
  return <LocaleContext.Provider value={{ rtl }}>{children}</LocaleContext.Provider>;
}

LocaleProvider.propTypes = {
  rtl: PropTypes.bool
};

export default LocaleProvider;
