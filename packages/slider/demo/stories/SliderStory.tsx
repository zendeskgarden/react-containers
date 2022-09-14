/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useCallback } from 'react';
import { Story } from '@storybook/react';

import {
  ISliderContainerProps,
  IUseSliderProps,
  IUseSliderReturnValue,
  SliderContainer,
  useSlider
} from '@zendeskgarden/container-slider';

import { IArgs } from './types';

export const Component = ({
  storyArgs,
  value,
  getSliderRootProps,
  getSliderTrackProps,
  getSliderThumbProps
}: { storyArgs: Omit<IArgs, 'as'> } & IUseSliderReturnValue) => {
  const { rtl, disabled, max } = storyArgs;

  const convertThumbValueToPercentage = useCallback(
    (thumbValue: number): string => `${(thumbValue / max!) * 100}%`,
    [max]
  );

  const getTrackGradient = useCallback(() => {
    const direction = rtl ? '-90deg' : '90deg';
    let fillStart = '0%';
    let fillEnd = convertThumbValueToPercentage(value[0] || 0);

    if (value.length > 1) {
      fillStart = convertThumbValueToPercentage(value[0]);
      fillEnd = convertThumbValueToPercentage(value[value.length - 1]);
    }

    return `
      linear-gradient(
        ${direction},
        #fff 0%,
        #fff ${fillStart},
        currentColor ${fillStart},
        currentColor ${fillEnd},
        #fff ${fillEnd},
        #fff 100%
      )
    `.trim();
  }, [rtl, value, convertThumbValueToPercentage]);

  const getThumbPosition = useCallback(
    (thumbValue: number) => {
      const percentage = convertThumbValueToPercentage(thumbValue);
      const position = `calc(${percentage} - (40px / 2))`;

      let css;

      if (rtl) {
        css = {
          right: position
        };
      } else {
        css = {
          left: position
        };
      }

      return css;
    },
    [rtl, convertThumbValueToPercentage]
  );

  return (
    <fieldset
      className={`box-border ${disabled ? 'text-grey-400' : 'text-grey-800'}`}
      style={{ width: '50vw' }}
      dir={rtl ? 'rtl' : 'ltr'}
    >
      <legend className="sr-only">
        <h2>Price range</h2>
      </legend>
      <div
        className="border border-grey-800 border-solid box-border h-6 my-2 relative rounded-full"
        style={{ background: getTrackGradient() }}
        {...getSliderRootProps()}
        {...getSliderTrackProps()}
      >
        {value.map((_, index: number) => {
          const props = getSliderThumbProps({
            index,
            'aria-label': index === 0 ? 'Minimum price' : 'Maximum price'
          });

          return (
            <div
              className={`absolute bg-white border border-grey-800 border-solid bottom-0 box-border h-10 inline-flex items-center justify-center m-auto outline-1 outline-transparent rounded-full select-none text-center text-grey-800 top-0 w-10 ${
                rtl ? 'left-auto' : 'right-auto'
              } ${!disabled && 'focus:ring-2 focus:ring-offset-2'}`}
              style={getThumbPosition(props['aria-valuenow'])}
              key={index}
              {...props}
            >
              <span className="box-border pointer-events-none">{props['aria-valuenow']}</span>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};

const Container = ({ ...args }: ISliderContainerProps & Omit<IArgs, 'as'>) => (
  <SliderContainer {...args}>
    {({
      getSliderRootProps,
      getSliderTrackProps,
      getSliderThumbProps,
      value
    }: IUseSliderReturnValue) => (
      <Component
        storyArgs={args}
        value={value}
        getSliderRootProps={getSliderRootProps}
        getSliderTrackProps={getSliderTrackProps}
        getSliderThumbProps={getSliderThumbProps}
      />
    )}
  </SliderContainer>
);

const Hook = ({ ...args }: IUseSliderProps & Omit<IArgs, 'as'>) => {
  const {
    getSliderRootProps,
    getSliderTrackProps,
    getSliderThumbProps,
    value
  }: IUseSliderReturnValue = useSlider({
    ...args
  });

  return (
    <Component
      storyArgs={args}
      value={value}
      getSliderRootProps={getSliderRootProps}
      getSliderTrackProps={getSliderTrackProps}
      getSliderThumbProps={getSliderThumbProps}
    />
  );
};

export const SliderStory: Story<IArgs> = ({ as, ...args }) => {
  switch (as) {
    case 'container':
      return <Container {...args} />;

    case 'hook':
    default:
      return <Hook {...args} />;
  }
};
