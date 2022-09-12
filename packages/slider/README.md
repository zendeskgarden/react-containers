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
  const { getSliderRootProps, getSliderTrackProps, getSliderThumbProps, value } = useSlider();

  return (
    <div {...getSliderRootProps()}>
      <div {...getSliderTrackProps()}>
        <div {...getSliderThumbProps()} />
      </div>
    </div>
  );
};
```

### SliderContainer

```jsx
import { SliderContainer } from '@zendeskgarden/container-slider';

<SliderContainer>
  {({ getSliderRootProps, getSliderTrackProps, getSliderThumbProps, value }) => {
    <div {...getSliderRootProps()}>
      <div {...getSliderTrackProps()}>
        <div {...getSliderThumbProps()} />
      </div>
    </div>;
  }}
</SliderContainer>;
```
