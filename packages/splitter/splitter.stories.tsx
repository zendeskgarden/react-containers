/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState } from 'react';
import { SplitterContainer, IUseSplitterReturnValue, useSplitter } from './src';
import { SplitterOrientation, SplitterType, SplitterPosition } from './src/useSplitter';

const ARGS = {
  type: SplitterType.VARIABLE,
  orientation: SplitterOrientation.VERTICAL,
  min: 200,
  max: 700,
  ariaLabel: 'primary-pane',
  defaultValueNow: 200,
  position: SplitterPosition.TRAILS,
  rtl: false
};

const flexContainerStyle: React.CSSProperties = {
  minHeight: '200px',
  border: 'solid black',
  display: 'flex'
};

const separatorStyle: React.CSSProperties = {
  backgroundColor: 'black',
  height: 'auto',
  cursor: 'col-resize',
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: '10px'
};

const primaryPaneStyle: React.CSSProperties = {
  flexGrow: 0,
  flexShrink: 0,
  overflow: 'auto',
  padding: '1em'
};

const secondaryPaneStyle: React.CSSProperties = {
  padding: '1em',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 'auto'
};

export const Container = ({
  type,
  min,
  max,
  orientation,
  ariaLabel,
  defaultValueNow,
  keyboardStep,
  position,
  rtl
}) => {
  const Splitter = () => {
    const mode = rtl ? 'rtl' : 'ltr';

    return (
      <SplitterContainer
        defaultValueNow={defaultValueNow}
        ariaLabel={ariaLabel}
        type={type}
        min={min}
        max={max}
        orientation={orientation}
        keyboardStep={keyboardStep}
        position={position}
        rtl={rtl}
      >
        {({ getSeparatorProps, getPrimaryPaneProps, valueNow }: IUseSplitterReturnValue) => {
          const separatorProps = getSeparatorProps({
            style: {
              ...separatorStyle,
              cursor: orientation === SplitterOrientation.HORIZONTAL ? 'row-resize' : 'col-resize'
            }
          });
          const primaryPaneProps = getPrimaryPaneProps({
            style: primaryPaneStyle
          });

          return (
            <div
              dir={mode}
              style={{
                ...flexContainerStyle,
                flexDirection: orientation === SplitterOrientation.HORIZONTAL ? 'column' : 'row'
              }}
            >
              <div
                {...primaryPaneProps}
                style={{
                  ...primaryPaneProps.style,
                  flexBasis: valueNow
                }}
              >
                Thai tabasco pepper cremini mushrooms crumbled lentils one bowl almonds delightful
                blueberry scones simmer muffins red pepper jalapeño cherry pasta chocolate
                bruschetta.
              </div>
              <div {...separatorProps} />
              <div style={secondaryPaneStyle}>
                Grains spring soba noodles pomegranate veggie burgers picnic cocoa green tea lime
                maple orange tempeh ginger tofu leek basmati double dark chocolate figs artichoke
                hearts raspberry fizz lemon lime minty summertime scotch bonnet pepper banana
                four-layer pine nuts Thai sun pepper sesame soba noodles mediterranean vegetables
                chocolate cookie. Udon noodles toasted hazelnuts peach strawberry mango ginger
                lemongrass agave green tea homemade balsamic
              </div>
            </div>
          );
        }}
      </SplitterContainer>
    );
  };

  return <Splitter />;
};

Container.storyName = 'SplitterContainer';
Container.args = ARGS;

export const Hook = ({
  type,
  min,
  max,
  orientation,
  ariaLabel,
  defaultValueNow,
  keyboardStep,
  position,
  rtl
}) => {
  const Splitter = () => {
    const mode = rtl ? 'rtl' : 'ltr';
    const { getSeparatorProps, getPrimaryPaneProps, valueNow } = useSplitter({
      type,
      min,
      max,
      orientation,
      ariaLabel,
      defaultValueNow,
      keyboardStep,
      position,
      rtl
    });
    const separatorProps = getSeparatorProps({
      style: {
        ...separatorStyle,
        cursor: orientation === SplitterOrientation.HORIZONTAL ? 'row-resize' : 'col-resize'
      }
    });
    const primaryPaneProps = getPrimaryPaneProps({
      style: primaryPaneStyle
    });

    return (
      <div
        dir={mode}
        style={{
          ...flexContainerStyle,
          flexDirection: orientation === SplitterOrientation.HORIZONTAL ? 'column' : 'row'
        }}
      >
        <div
          {...primaryPaneProps}
          style={{
            ...primaryPaneProps.style,
            flexBasis: valueNow
          }}
        >
          Thai tabasco pepper cremini mushrooms crumbled lentils one bowl almonds delightful
          blueberry scones simmer muffins red pepper jalapeño cherry pasta chocolate bruschetta.
        </div>
        <div {...separatorProps} />
        <div style={secondaryPaneStyle}>
          Grains spring soba noodles pomegranate veggie burgers picnic cocoa green tea lime maple
          orange tempeh ginger tofu leek basmati double dark chocolate figs artichoke hearts
          raspberry fizz lemon lime minty summertime scotch bonnet pepper banana four-layer pine
          nuts Thai sun pepper sesame soba noodles mediterranean vegetables chocolate cookie. Udon
          noodles toasted hazelnuts peach strawberry mango ginger lemongrass agave green tea
          homemade balsamic
        </div>
      </div>
    );
  };

  return <Splitter />;
};

Hook.args = ARGS;
Hook.storyName = 'useSplitter';
Hook.parameters = {
  docs: {
    description: {
      story: `The \`useSplitter\` hook manages positioning and required accessibility attributes for the window splitting separator.`
    }
  }
};

export const ManyHooks = ({
  type,
  min,
  max,
  orientation,
  ariaLabel,
  defaultValueNow,
  keyboardStep,
  rtl
}) => {
  const Splitter = () => {
    const mode = rtl ? 'rtl' : 'ltr';
    const firstSplitterBag = useSplitter({
      type,
      min,
      max,
      orientation,
      ariaLabel,
      defaultValueNow,
      keyboardStep,
      position: SplitterPosition.TRAILS,
      rtl
    });
    const secondSplitterBag = useSplitter({
      type,
      min,
      max,
      orientation,
      ariaLabel,
      defaultValueNow,
      keyboardStep,
      position: SplitterPosition.LEADS,
      rtl
    });
    const firstSeparator = firstSplitterBag.getSeparatorProps({
      style: {
        ...separatorStyle,
        cursor: orientation === SplitterOrientation.HORIZONTAL ? 'row-resize' : 'col-resize'
      }
    });
    const firstPrimaryPane = firstSplitterBag.getPrimaryPaneProps({
      style: primaryPaneStyle
    });

    const secondSeparator = secondSplitterBag.getSeparatorProps({
      style: {
        ...separatorStyle,
        cursor: orientation === SplitterOrientation.HORIZONTAL ? 'row-resize' : 'col-resize'
      }
    });

    const secondPrimaryPane = secondSplitterBag.getPrimaryPaneProps({
      style: primaryPaneStyle
    });

    return (
      <div style={{ paddingRight: '2em', margin: '2em' }}>
        <div style={{ padding: '2em', margin: '2em' }}>
          <div
            dir={mode}
            style={{
              ...flexContainerStyle,
              height: '1000px',
              flexDirection: orientation === SplitterOrientation.HORIZONTAL ? 'column' : 'row'
            }}
          >
            <div
              {...firstPrimaryPane}
              style={{
                ...firstPrimaryPane.style,
                flexBasis: firstSplitterBag.valueNow
              }}
            >
              Thai tabasco pepper cremini mushrooms crumbled lentils one bowl almonds delightful
              blueberry scones simmer muffins red pepper jalapeño cherry pasta chocolate bruschetta.
            </div>
            <div {...firstSeparator} />
            <div style={secondaryPaneStyle}>
              Grains spring soba noodles pomegranate veggie burgers picnic cocoa green tea lime
              maple orange tempeh ginger tofu leek basmati double dark chocolate figs artichoke
              hearts raspberry fizz lemon lime minty summertime scotch bonnet pepper banana
              four-layer pine nuts Thai sun pepper sesame soba noodles mediterranean vegetables
              chocolate cookie. Udon noodles toasted hazelnuts peach strawberry mango ginger
              lemongrass agave green tea homemade balsamic
            </div>
            <div {...secondSeparator} />
            <div
              {...secondPrimaryPane}
              style={{
                ...secondPrimaryPane.style,
                flexBasis: secondSplitterBag.valueNow
              }}
            >
              Thai tabasco pepper cremini mushrooms crumbled lentils one bowl almonds delightful
              blueberry scones simmer muffins red pepper jalapeño cherry pasta chocolate bruschetta.
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <Splitter />;
};

ManyHooks.args = ARGS;
ManyHooks.argTypes = {
  position: {
    table: {
      disable: true
    }
  }
};
ManyHooks.storyName = 'multiple useSplitter';
ManyHooks.parameters = {
  docs: {
    description: {
      story: `The \`useSplitter\` hooks manage positioning and required accessibility attributes for the window splitting separator.`
    }
  }
};

export const Controlled = ({
  type,
  min,
  max,
  orientation,
  ariaLabel,
  keyboardStep,
  position,
  rtl
}) => {
  const Splitter = () => {
    const [value, onChange] = useState(300);
    const mode = rtl ? 'rtl' : 'ltr';
    const { getSeparatorProps, getPrimaryPaneProps, valueNow } = useSplitter({
      type,
      min,
      max,
      orientation,
      ariaLabel,
      valueNow: value,
      keyboardStep,
      onChange,
      position,
      rtl
    });
    const separatorProps = getSeparatorProps({
      style: {
        ...separatorStyle,
        cursor: orientation === SplitterOrientation.HORIZONTAL ? 'row-resize' : 'col-resize'
      }
    });

    const primaryPaneProps = getPrimaryPaneProps({
      style: primaryPaneStyle
    });

    return (
      <div
        dir={mode}
        style={{
          ...flexContainerStyle,
          flexDirection: orientation === SplitterOrientation.HORIZONTAL ? 'column' : 'row'
        }}
      >
        <div
          {...primaryPaneProps}
          style={{
            ...primaryPaneProps.style,
            flexBasis: valueNow
          }}
        >
          <p>Controlled ValueNow: {value}</p>
          <p>
            Thai tabasco pepper cremini mushrooms crumbled lentils one bowl almonds delightful
            blueberry scones simmer muffins red pepper jalapeño cherry pasta chocolate bruschetta.
          </p>
        </div>
        <div {...separatorProps} />
        <div style={secondaryPaneStyle}>
          Grains spring soba noodles pomegranate veggie burgers picnic cocoa green tea lime maple
          orange tempeh ginger tofu leek basmati double dark chocolate figs artichoke hearts
          raspberry fizz lemon lime minty summertime scotch bonnet pepper banana four-layer pine
          nuts Thai sun pepper sesame soba noodles mediterranean vegetables chocolate cookie. Udon
          noodles toasted hazelnuts peach strawberry mango ginger lemongrass agave green tea
          homemade balsamic
        </div>
      </div>
    );
  };

  return <Splitter />;
};

Controlled.storyName = 'controlled useSplitter';
Controlled.args = ARGS;

export default {
  component: SplitterContainer,
  title: 'Splitter Container',
  parameters: {
    layout: 'padded',
    componentSubtitle: `A container component which wraps the useSplitter hook.`
  }
};
