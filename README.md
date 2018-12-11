# Garden React Containers [![Build Status](https://img.shields.io/travis/zendeskgarden/react-containers/master.svg?style=flat-square)](https://travis-ci.org/zendeskgarden/react-containers) [![Dependency Status](https://img.shields.io/david/dev/zendeskgarden/react-containers.svg?style=flat-square)](https://david-dm.org/zendeskgarden/react-containers?type=dev) [![Coverage Status](https://img.shields.io/coveralls/github/zendeskgarden/react-containers/master.svg?style=flat-square)](https://coveralls.io/github/zendeskgarden/react-containers) <!-- markdownlint-disable -->

<!-- markdownlint-enable -->

> :seedling: Garden is a design system for Zendesk

Garden Containers provide an accessible foundation to start from in your journey to building a11y,
keyboard navigable and RTL aware components.

## Installation

See the individual package README for the React container you would like
to install.

| Package                                                    | Version                                                     | Dependencies                                                                   |
| ---------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`@zendeskgarden/container-selection`](packages/selection) | [![npm version][selection npm version]][selection npm link] | [![Dependency Status][selection dependency status]][selection dependency link] |

[selection npm version]: https://img.shields.io/npm/v/@zendeskgarden/container-selection.svg?style=flat-square
[selection npm link]: https://www.npmjs.com/package/@zendeskgarden/container-selection
[selection dependency status]: https://img.shields.io/david/zendeskgarden/react-containers.svg?path=packages/selection&style=flat-square
[selection dependency link]: https://david-dm.org/zendeskgarden/react-containers?path=packages/selection

## Usage

Our packages are easily consumable with [create-react-app](https://github.com/facebook/create-react-app)
and standard webpack configs.

All packages follow a similar installation process. Below is an example of
consuming our [container-selection](https://www.npmjs.com/package/@zendeskgarden/container-selection)
package.

### Install dependencies

```sh
# Install garden package
npm install @zendeskgarden/container-selection
```

```jsx
import React, { Component } from 'react';
import { render } from 'react-dom';

/** Consume throughout app */
import { KeyboardFocusContainer } from '@zendeskgarden/container-selection';

class App extends Component {
  render() {
    return (
      <KeyboardFocusContainer>
        {({ getFocusProps, focused }) => (
          <button {...getFocusProps()}>
            {focused ? 'Keyboard focused!' : 'Not keyboard focused'}
          </button>
        )}
      </KeyboardFocusContainer>
    );
  }
}

render(<App />, document.getElementById('root'));
```

## Contribution

Thanks for your interest in Garden! Community involvement helps make our
design system fresh and tasty for everyone.

Got issues with what you find here? Please feel free to create an
[issue](https://github.com/zendeskgarden/react-containers/issues/new).

If you'd like to take a crack at making some changes, please follow our
[contributing](.github/CONTRIBUTING.md) documentation for details
needed to submit a PR.

Community behavior is benevolently ruled by a [code of
conduct](.github/CODE_OF_CONDUCT.md). Please participate accordingly.

## License

Copyright 2018 Zendesk

Licensed under the [Apache License, Version 2.0](LICENSE.md)
