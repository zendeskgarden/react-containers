# @zendeskgarden/container-schedule [![npm version](https://img.shields.io/npm/v/@zendeskgarden/container-schedule.svg?style=flat-square)](https://www.npmjs.com/package/@zendeskgarden/container-schedule)

This package includes containers relating to schedule in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-schedule
```

## Usage

For live examples check out our [storybook](https://zendeskgarden.github.io/react-containers?path=/story/schedule-container--useschedule).

### As a Render Prop Component

```jsx static
import { ScheduleContainer } from '@zendeskgarden/container-schedule';

<ScheduleContainer duration={1000} delayMS={0}>
  {elapsed => <p>Percentage: {(elapsed * 100).toFixed(0)}%</p>}
</ScheduleContainer>;
```

### As a hook

```jsx static
import { useSchedule } from '@zendeskgarden/container-schedule';

const Animation = () => {
  const elapsed = useSchedule({ duration: 1000, delayMS: 0 });

  return <p>Percentage: {(elapsed * 100).toFixed(0)}%</p>;
};
```

## Info

See [react-loaders][loaders link] component as a non-trivial use of this.

[loaders link]: https://github.com/zendeskgarden/react-components/tree/master/packages/loaders
