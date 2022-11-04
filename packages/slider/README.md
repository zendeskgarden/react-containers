# @zendeskgarden/container-slider [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-slider
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-slider

This package includes containers relating to Slider in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-slider
```

## Usage

Check out [storybook](https://zendeskgarden.github.io/react-containers) for live examples.

### useSlider

```jsx
import { useSlider } from '@zendeskgarden/container-slider';

const Slider = () => {
  const trackRef = createRef();
  const minThumbRef = createRef();
  const maxThumbRef = createRef();
  const { getTrackProps, getMinThumbProps, getMaxThumbProps, minValue, maxValue } = useSlider({
    trackRef,
    minThumbRef,
    maxThumbRef
  });

  return (
    <div {...getTrackProps()} ref={trackRef}>
      <div {...getMinThumbProps()} minThumbRef={minThumbRef}>
        {minValue}
      </div>
      <div {...getMaxThumbProps()} maxThumbRef={maxThumbRef}>
        {maxValue}
      </div>
    </div>
  );
};
```

### SliderContainer

```jsx
import { SliderContainer } from '@zendeskgarden/container-slider';

const trackRef = createRef();
const minThumbRef = createRef();
const maxThumbRef = createRef();

<SliderContainer trackRef={trackRef} minThumbRef={minThumbRef} maxThumbRef={maxThumbRef}>
  {({ getTrackProps, getMinThumbProps, getMaxThumbProps, minValue, maxValue }) => (
    <div {...getTrackProps()} trackRef={trackRef}>
      <div {...getMinThumbProps()} minThumbRef={minThumbRef}>
        {minValue}
      </div>
      <div {...getMaxThumbProps()} maxThumbRef={maxThumbRef}>
        {maxValue}
      </div>
    </div>
  )}
</SliderContainer>;
```
