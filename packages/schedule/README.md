# @zendeskgarden/container-schedule [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-schedule
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-schedule

This package includes containers relating to schedule in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-schedule
```

## Usage

Check out [storybook](https://zendeskgarden.github.io/react-containers) for live examples.

### As a hook

The `useSchedule` hook implements a schedule (timer) and communicates when it has elapsed.

```jsx
import { useSchedule } from '@zendeskgarden/container-schedule';

const Animation = () => {
  const elapsed = useSchedule({ duration: 1000, delayMS: 0 });

  return <p>Percentage: {(elapsed * 100).toFixed(0)}%</p>;
};
```

### As a Render Prop Component

```jsx
import { ScheduleContainer } from '@zendeskgarden/container-schedule';

<ScheduleContainer duration={1000} delayMS={0}>
  {elapsed => <p>Percentage: {(elapsed * 100).toFixed(0)}%</p>}
</ScheduleContainer>;
```

## Info

See [react-loaders][loaders link] component as a non-trivial use of this.

[loaders link]: https://github.com/zendeskgarden/react-components/tree/main/packages/loaders
