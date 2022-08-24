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
import { IUseSliderProps, IUseSliderReturnValue, TSliderValues, State, Action } from './types';
import { composeEventHandlers, KEYS } from '@zendeskgarden/container-utilities';
import debounce from 'lodash.debounce';

const POSSIBLE_SLIDER_KEYS = [
  KEYS.LEFT, 
  KEYS.RIGHT, 
  KEYS.UP, 
  KEYS.DOWN, 
  KEYS.HOME, 
  KEYS.END
];

const SLIDER_KEYS = {
  INCREASE: [
    KEYS.UP,
    KEYS.RIGHT
  ],
  DECREASE: [
    KEYS.DOWN,
    KEYS.LEFT
  ],
  SET_MIN: KEYS.HOME,
  SET_MAX: KEYS.END
};

export const useSlider = ({
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  required,
  disabled,
  readOnly,
  orientation = 'horizontal',
  rtl
}: IUseSliderProps): IUseSliderReturnValue => {
  // const isControlled = defaultValue !== null || defaultValue !== undefined;
  const isInteractive = disabled === false && readOnly === false;
  
  const [sliderWidth, setSliderWidth] = useState(0);
  const trackElement = useRef<HTMLDivElement>(null);

  /**
   * The window resize event is debounced to reduce unnecessary renders
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSliderWidth = useCallback(
    debounce(() => {
      if (trackElement.current) {
        setSliderWidth(trackElement.current.getBoundingClientRect().width);
      }
    }, 100),
    []
  );

  useEffect(() => {
    getSliderWidth();
    window.addEventListener('resize', getSliderWidth);
    return () => {
      window.removeEventListener('resize', getSliderWidth);
    };
  }, [getSliderWidth]);

  const initialState: number[] = defaultValue ? defaultValue : [min, max];

  const init = (initialState: number[]) => {
    return {rangeValue: initialState};
  }

  const reducer = (state: State, action: any) => {
    console.log("reducer state", state);
    switch (action.type) {
      case 'stepUp':
        return {
          rangeValue: [
            ...state.rangeValue.slice(0, action.index),
            state.rangeValue[action.index] + step,
            ...state.rangeValue.slice(action.index + 1),
          ]
        };
      case 'stepDown':
        return {
          rangeValue: [
            ...state.rangeValue.slice(0, action.index),
            state.rangeValue[action.index] - step,
            ...state.rangeValue.slice(action.index + 1),
          ]
        };
      case 'setRangeMin':
        return {
          rangeValue: [
            ...state.rangeValue.slice(0, action.index),
            min,
            ...state.rangeValue.slice(action.index + 1),
          ]
        };
      case 'setRangeMax':
        return {
          rangeValue: [
            ...state.rangeValue.slice(0, action.index),
            max,
            ...state.rangeValue.slice(action.index + 1),
          ]
        };   
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState, init);

  const getThumbValueNumber = (index = 0) => {
    // if (typeof state.rangeValue[index] === 'object') {
    //   return state.rangeValue[index].number;
    // }
    // if (typeof state.rangeValue === 'number') {
    //   return state.rangeValue
    // }
    return state.rangeValue[index];
  };

  const getThumbValueText = (index = 0) => {
    // if (typeof state.rangeValue[index] === 'object') {
    //   return state.rangeValue[index].text;
    // }
    // if (typeof state.rangeValue === 'number') {
    //   return state.rangeValue
    // }
    return undefined;
  };

  // Set the min and max of each thumb based on the value, min, and max of the other thumbs

  // const setValueMin = () => setSliderValue(sliderMin);

  // const setValueMax = () => setSliderValue(sliderMax);

  // const increaseValue = () => {
  //   let nextIncrease = sliderValue + step;
  //   if (nextIncrease > sliderMax) {
  //     setValueMax();
  //   }
  //   setSliderValue(nextIncrease);
  // }

  // const decreaseValue = () => {
  //   let nextDecrease = sliderValue - step;
  //   if (nextDecrease < sliderMin) {
  //     setValueMin();
  //   }
  //   setSliderValue(nextDecrease);
  // }

  const handleTrackClick: MouseEventHandler = (event) => {
    console.log("track clicked", event);
    console.log("current slider width:", sliderWidth);
  }

  const handleThumbKeyDown: any = (event: any) => {
    console.log(event);

    if (isInteractive && POSSIBLE_SLIDER_KEYS.includes(event.key)) {
      event.preventDefault();
      
      // if (SLIDER_KEYS.INCREASE.includes(event.key) && sliderValue < rangeMax) {
      if (SLIDER_KEYS.INCREASE.includes(event.key)) {
        // increaseValue();
        dispatch({type: 'stepUp', index: event.target.dataset.index})
      }

      // if (SLIDER_KEYS.DECREASE.includes(event.key) && sliderValue > rangeMin) {
      if (SLIDER_KEYS.DECREASE.includes(event.key)) {
        // decreaseValue();
        dispatch({type: 'stepDown', index: event.target.dataset.index})
      }

      if (event.key === SLIDER_KEYS.SET_MIN) {
        // setValueMin();
        dispatch({type: 'setRangeMin', index: event.target.dataset.index})
      }

      if (event.key === SLIDER_KEYS.SET_MAX) {
        // setValueMax();
        dispatch({type: 'setRangeMax', index: event.target.dataset.index})
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
    ...props
  }) => ({
    ...props,
    'aria-label': ariaLabel,
    'aria-valuenow': getThumbValueNumber(index),
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-required': required,
    'aria-disabled': disabled,
    'aria-readonly': readOnly,
    'aria-orientation': orientation,
    // 'aria-valuetext': getThumbValueText(index),
    'data-index': index,
    role: 'slider',
    tabIndex: 0,
    onKeyDown: handleThumbKeyDown
  });

  return {
    getRootProps,
    getTrackProps,
    getThumbProps
  };
};
