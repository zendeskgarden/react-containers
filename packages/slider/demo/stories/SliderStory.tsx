/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef, forwardRef } from 'react';
import { Story } from '@storybook/react';
import {
  ISliderContainerProps,
  IUseSliderProps,
  IUseSliderReturnValue,
  SliderContainer,
  useSlider
} from '@zendeskgarden/container-slider';
import classNames from 'classnames';

interface IComponentProps extends IUseSliderReturnValue {
  max: IUseSliderProps['max'];
  min: IUseSliderProps['min'];
  minThumbRef: IUseSliderProps<Element, HTMLDivElement>['minThumbRef'];
  maxThumbRef: IUseSliderProps<Element, HTMLDivElement>['minThumbRef'];
  disabled: IUseSliderProps['disabled'];
  rtl: IUseSliderProps['rtl'];
}

const Component = forwardRef<HTMLDivElement, IComponentProps>(
  (
    {
      getTrackProps,
      getMinThumbProps,
      getMaxThumbProps,
      min = 0,
      max = 100,
      minValue,
      maxValue,
      minThumbRef,
      maxThumbRef,
      disabled,
      rtl
    },
    ref
  ) => {
    const trackClassName = classNames('border', 'border-solid', 'h-4', 'relative', 'rounded-full', {
      'text-grey-400': disabled
    });

    const thumbClassName = classNames(
      'absolute',
      'bg-white',
      'border',
      'border-solid',
      'bottom-0',
      'h-9',
      'inline-flex',
      'items-center',
      'justify-center',
      'm-auto',
      'rounded-full',
      'select-none',
      'top-0',
      'w-9'
    );

    const minPosition = ((minValue - min) / (max - min)) * 100;
    const maxPosition = ((maxValue - min) / (max - min)) * 100;

    const background = `linear-gradient(
      ${rtl ? '-90deg' : '90deg'},
      #fff 0%,
      #fff ${minPosition}%,
      currentColor ${minPosition}%,
      currentColor ${maxPosition}%,
      #fff ${maxPosition}%,
      #fff 100%
    )`;

    return (
      <div
        className={trackClassName}
        style={{ width: '50vw', background }}
        {...getTrackProps()}
        ref={ref}
      >
        <div
          className={thumbClassName}
          {...getMinThumbProps({ 'aria-label': 'Minimum range value' })}
          dir={rtl ? 'rtl' : 'ltr'}
          style={{ [rtl ? 'right' : 'left']: `calc(${minPosition}% - 18px)` }}
          ref={minThumbRef}
        >
          {minValue}
        </div>
        <div
          className={thumbClassName}
          {...getMaxThumbProps({ 'aria-label': 'Maximum range value' })}
          style={{ [rtl ? 'right' : 'left']: `calc(${maxPosition}% - 18px)` }}
          ref={maxThumbRef}
        >
          {maxValue}
        </div>
      </div>
    );
  }
);

Component.displayName = 'Component';

const Container = ({
  trackRef,
  minThumbRef,
  maxThumbRef,
  min,
  max,
  disabled,
  rtl,
  ...props
}: ISliderContainerProps<HTMLDivElement, HTMLDivElement>) => (
  <SliderContainer
    trackRef={trackRef}
    minThumbRef={minThumbRef}
    maxThumbRef={maxThumbRef}
    min={min}
    max={max}
    disabled={disabled}
    rtl={rtl}
    {...props}
  >
    {containerProps => (
      <Component
        {...containerProps}
        ref={trackRef}
        minThumbRef={minThumbRef}
        maxThumbRef={maxThumbRef}
        min={min}
        max={max}
        disabled={disabled}
        rtl={rtl}
      />
    )}
  </SliderContainer>
);

const Hook = ({
  trackRef,
  minThumbRef,
  maxThumbRef,
  min,
  max,
  disabled,
  rtl,
  ...props
}: IUseSliderProps<HTMLDivElement, HTMLDivElement>) => {
  const hookProps = useSlider<HTMLDivElement, HTMLDivElement>({
    trackRef,
    minThumbRef,
    maxThumbRef,
    min,
    max,
    disabled,
    rtl,
    ...props
  });

  return (
    <Component
      {...hookProps}
      ref={trackRef}
      minThumbRef={minThumbRef}
      maxThumbRef={maxThumbRef}
      min={min}
      max={max}
      disabled={disabled}
      rtl={rtl}
    />
  );
};

interface IArgs extends ISliderContainerProps<HTMLDivElement, HTMLDivElement> {
  as: 'hook' | 'container';
}

export const SliderStory: Story<IArgs> = ({ as, ...args }) => {
  const Splitter = () => {
    const trackRef = createRef<HTMLDivElement>();
    const minThumbRef = createRef<HTMLDivElement>();
    const maxThumbRef = createRef<HTMLDivElement>();

    switch (as) {
      case 'container':
        return (
          <Container
            {...args}
            trackRef={trackRef}
            minThumbRef={minThumbRef}
            maxThumbRef={maxThumbRef}
          />
        );

      case 'hook':
      default:
        return (
          <Hook {...args} trackRef={trackRef} minThumbRef={minThumbRef} maxThumbRef={maxThumbRef} />
        );
    }
  };

  return <Splitter />;
};
