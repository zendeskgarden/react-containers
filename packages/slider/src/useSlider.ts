/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { 
  MouseEventHandler, 
  KeyboardEventHandler,
  useCallback,
  useEffect, 
  useReducer, 
  useRef, 
  useState
} from 'react';
import { IUseSliderProps, IUseSliderReturnValue, TSliderValues } from './types';
import { composeEventHandlers, KEYS } from '@zendeskgarden/container-utilities';
import debounce from 'lodash.debounce';
import { AnyFramework } from '@storybook/csf';

const POSSIBLE_SLIDER_KEYS = [
  KEYS.LEFT, 
  KEYS.RIGHT, 
  KEYS.UP, 
  KEYS.DOWN, 
  KEYS.HOME, 
  KEYS.END
];

const SLIDER_KEYS = {
  STEP_UP: [
    KEYS.UP,
    KEYS.RIGHT
  ],
  STEP_DOWN: [
    KEYS.DOWN,
    KEYS.LEFT
  ],
  RESET_RANGE_MIN: KEYS.HOME,
  RESET_RANGE_MAX: KEYS.END
};

export const sliderActionTypes = {
  STEP_UP: 'stepUp',
  STEP_DOWN: 'stepDown',
  RESET_RANGE_MIN: 'resetRangeMin',
  RESET_RANGE_MAX: 'resetRangeMax',
  SET_CUSTOM_VALUE: 'setCustomValue'
}

export const useSlider = ({
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  required,
  disabled,
  readOnly,
  orientation = 'horizontal',
  rtl,
  // reducer = defaultSliderReducer
}: IUseSliderProps): IUseSliderReturnValue => {
  // const isControlled = defaultValue !== null || defaultValue !== undefined;
  const isInteractive = disabled === false && readOnly === false;
  
  const [sliderDimensions, setSliderDimensions] = useState<DOMRect | null>(null);
  const trackElement = useRef<HTMLDivElement>(null);

  /**
   * The window resize event is debounced to reduce unnecessary renders
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSliderDimensions = useCallback(
    debounce(() => {
      if (trackElement.current) {
        setSliderDimensions(trackElement.current.getBoundingClientRect());
      }
    }, 100),
    []
  );

  useEffect(() => {
    getSliderDimensions();
    window.addEventListener('resize', getSliderDimensions);
    return () => {
      window.removeEventListener('resize', getSliderDimensions);
    };
  }, [getSliderDimensions]);

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case sliderActionTypes.STEP_UP:
        return {
          rangeValue: [
            ...state.rangeValue.slice(0, action.index),
            state.rangeValue[action.index] + step,
            ...state.rangeValue.slice(action.index + 1),
          ]
        };
      case sliderActionTypes.STEP_DOWN:
        return {
          rangeValue: [
            ...state.rangeValue.slice(0, action.index),
            state.rangeValue[action.index] - step,
            ...state.rangeValue.slice(action.index + 1),
          ]
        };
      case sliderActionTypes.RESET_RANGE_MIN:
        return {
          rangeValue: [
            ...state.rangeValue.slice(0, action.index),
            min,
            ...state.rangeValue.slice(action.index + 1),
          ]
        };
      case sliderActionTypes.RESET_RANGE_MAX:
        return {
          rangeValue: [
            ...state.rangeValue.slice(0, action.index),
            max,
            ...state.rangeValue.slice(action.index + 1),
          ]
        };   
      case sliderActionTypes.SET_CUSTOM_VALUE:
        return {
          rangeValue: [
            ...state.rangeValue.slice(0, action.index),
            action.value,
            ...state.rangeValue.slice(action.index + 1),
          ]
        };    
      default:
        throw new Error();
    }
  }

  const initialState: number[] = defaultValue ? defaultValue : [min, max];

  const init = (initialState: number[]) => {
    return {rangeValue: initialState};
  }

  const [state, dispatch] = useReducer(reducer, initialState, init);

  const getThumbCurrentValueNumber = (index = 0) => {
    // if (typeof state.rangeValue[index] === 'object') {
    //   return state.rangeValue[index].number;
    // }
    // if (typeof state.rangeValue === 'number') {
    //   return state.rangeValue
    // }
    return state.rangeValue[index];
  };

  const getThumbCurrentValueText = (index = 0) => {
    // if (typeof state.rangeValue[index] === 'object') {
    //   return state.rangeValue[index].text;
    // }
    // if (typeof state.rangeValue === 'number') {
    //   return state.rangeValue
    // }
    return undefined;
  };

  const getThumbMinValueNumber = (index = 0) => {
    // By default, min value is overall range min
    let thumbMinValue = min;

    // If index is anything other than 0, then the min is the value of the thumb right before it
    if (index > 0) {
      thumbMinValue = state.rangeValue[index - 1];
    }

    return thumbMinValue;
  };

  const getThumbMaxValueNumber = (index = 0) => {
    // By default, max value is overall range max
    let thumbMaxValue = max;

    // If index is anything other than last available index, then the max is the value of the thumb right after it
    if (index < (state.rangeValue.length - 1)) {
      thumbMaxValue = state.rangeValue[index + 1];
    }

    return thumbMaxValue;
  };

  const shouldStepUp = (thumbIndex: number, thumbMax: number) => {
    return state.rangeValue[thumbIndex] < thumbMax;
  }

  const shouldStepDown = (thumbIndex: number, thumbMin: number) => {
    return state.rangeValue[thumbIndex] > thumbMin;
  }

  const convertMousePositionToValue = (event: MouseEvent) => {
    // https://github.com/zendeskgarden/react-components/blob/main/packages/forms/src/elements/MultiThumbRange.tsx#L156-L180

  }

  const handleTrackClick: MouseEventHandler = (event) => {
    // https://htmldom.dev/calculate-the-mouse-position-relative-to-an-element/

    console.log("current slider dimensions:", sliderDimensions);

    // Mouse position
    const x = event.clientX - sliderDimensions.left;
    console.log("x", x);

    const clickFraction = sliderDimensions.width / x;
    const closestValue = Math.round(max / clickFraction);
    console.log("closestValue", closestValue);

    // https://thewebdev.info/2021/04/18/how-to-get-the-closest-number-to-a-number-out-of-a-javascript-array/
    const closestThumbValue = state.rangeValue.reduce((previousValue, currentValue) => {
      return (Math.abs(currentValue - closestValue) < Math.abs(previousValue - closestValue) ? currentValue : previousValue);
    });
    console.log("index", closestThumbValue);

    const closestThumbIndex = state.rangeValue.findIndex(element => element === closestThumbValue);
    console.log("closestThumbIndex", closestThumbIndex);

    dispatch({type: sliderActionTypes.SET_CUSTOM_VALUE, index: closestThumbIndex, value: closestValue})
  }

  const handleThumbKeyDown: any = (event: any) => {
    if (isInteractive && POSSIBLE_SLIDER_KEYS.includes(event.key)) {

      if (SLIDER_KEYS.STEP_UP.includes(event.key) && shouldStepUp(event.target.dataset.index, event.target.ariaValueMax)) {
        dispatch({type: sliderActionTypes.STEP_UP, index: event.target.dataset.index})
      }

      if (SLIDER_KEYS.STEP_DOWN.includes(event.key) && shouldStepDown(event.target.dataset.index, event.target.ariaValueMin)) {
        dispatch({type: sliderActionTypes.STEP_DOWN, index: event.target.dataset.index})
      }

      if (event.key === SLIDER_KEYS.RESET_RANGE_MIN) {
        dispatch({type: sliderActionTypes.RESET_RANGE_MIN, index: 0})
      }

      if (event.key === SLIDER_KEYS.RESET_RANGE_MAX) {
        dispatch({type: sliderActionTypes.RESET_RANGE_MAX, index: state.rangeValue.length - 1})
      }
    }
  }

  const getRootProps: IUseSliderReturnValue['getRootProps'] = ({ ...props }) => ({
    'data-garden-container-id': 'containers.slider',
    'data-garden-container-version': PACKAGE_VERSION,
    ...props
  });

  const getTrackProps: IUseSliderReturnValue['getTrackProps'] = ({ ...props }) => ({
    ...props,
    ref: trackElement,
    onClick: handleTrackClick
  });

  const getThumbProps: IUseSliderReturnValue['getThumbProps'] = ({
    'aria-label': ariaLabel,
    index,
    onKeyDown,
    ...props
  }) => ({
    ...props,
    'aria-label': ariaLabel,
    'aria-valuenow': getThumbCurrentValueNumber(index),
    'aria-valuemin': getThumbMinValueNumber(index),
    'aria-valuemax': getThumbMaxValueNumber(index),
    'aria-required': required,
    'aria-disabled': disabled,
    'aria-readonly': readOnly,
    'aria-orientation': orientation,
    // 'aria-valuetext': getThumbCurrentValueText(index),
    'data-index': index,
    role: 'slider',
    tabIndex: 0,
    onKeyDown: composeEventHandlers(handleThumbKeyDown, onKeyDown),
  });

  return {
    getRootProps,
    getTrackProps,
    getThumbProps
  };
};
