# Garden React Containers [![Build Status](https://img.shields.io/travis/zendeskgarden/react-containers/master.svg?style=flat-square)](https://travis-ci.com/zendeskgarden/react-containers) [![Dependency Status](https://img.shields.io/david/dev/zendeskgarden/react-containers.svg?style=flat-square)](https://david-dm.org/zendeskgarden/react-containers?type=dev) [![Coverage Status](https://img.shields.io/coveralls/github/zendeskgarden/react-containers/master.svg?style=flat-square)](https://coveralls.io/github/zendeskgarden/react-containers) <!-- markdownlint-disable -->

<!-- markdownlint-enable -->

> :seedling: Garden is a design system for Zendesk

Garden Containers provide an accessible foundation to start from in your journey to building a11y,
keyboard navigable and RTL aware components.

## Installation

See the individual package README for the React container you would like
to install.

| Package                                                  | Version                                                   | Dependencies                                                                 |
| -------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [`@zendeskgarden/container-field`](packages/field)       | [![npm version][field npm version]][field npm link]       | [![Dependency Status][field dependency status]][field dependency link]       |
| [`@zendeskgarden/container-schedule`](packages/schedule) | [![npm version][schedule npm version]][schedule npm link] | [![Dependency Status][schedule dependency status]][schedule dependency link] |

[field npm version]: https://img.shields.io/npm/v/@zendeskgarden/container-field.svg?style=flat-square
[field npm link]: https://www.npmjs.com/package/@zendeskgarden/container-field
[field dependency status]: https://img.shields.io/david/zendeskgarden/react-containers.svg?path=packages/field&style=flat-square
[field dependency link]: https://david-dm.org/zendeskgarden/react-containers?path=packages/field
[schedule npm version]: https://img.shields.io/npm/v/@zendeskgarden/container-schedule.svg?style=flat-square
[schedule npm link]: https://www.npmjs.com/package/@zendeskgarden/container-schedule
[schedule dependency status]: https://img.shields.io/david/zendeskgarden/react-containers.svg?path=packages/schedule&style=flat-square
[schedule dependency link]: https://david-dm.org/zendeskgarden/react-containers?path=packages/schedule

## Usage

Our packages are easily consumable with [create-react-app](https://github.com/facebook/create-react-app)
and standard webpack configs.

All packages follow a similar installation process. Below is an example of
consuming our [container-schedule](https://www.npmjs.com/package/@zendeskgarden/container-schedule)
package.

### Install dependencies

```sh
# Install garden package
npm install @zendeskgarden/container-schedule
```

### Using as a render prop container

```jsx
import React, { Component } from 'react';
import { render } from 'react-dom';

/** Consume throughout app */
import { ScheduleContainer } from '@zendeskgarden/container-schedule';

class App extends Component {
  render() {
    return (
      <ScheduleContainer>
        {elapsed => (
          const x = 900;
          const styles = {
            transform: translateX(`${900*elapsed}`px)
          }

          return <div style={styles} />
        )}
      </ScheduleContainer>
    );
  }
}

render(<App />, document.getElementById('root'));
```

### Using as a hook

```jsx
import React from 'react';
import { render } from 'react-dom';

/** Consume throughout app */
import { useSchedule } from '@zendeskgarden/container-schedule';

const App = () => {
  const elapsed = useSchedule({duration: 1000});
  const x = 900;
  const styles = {
    transform: translateX(`${900*elapsed}`px)
  };

  return <div style={styles} />;
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

Copyright 2019 Zendesk

Licensed under the [Apache License, Version 2.0](LICENSE.md)
