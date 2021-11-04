/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState } from 'react';
import { SplitterContainer, IUseSplitterReturnValue, useSplitter } from './src';
import { SplitterOrientation, SplitterType } from './src/useSplitter';

const ARGS = {
  type: SplitterType.VARIABLE,
  orientation: SplitterOrientation.VERTICAL,
  min: 200,
  max: 700,
  ariaLabel: 'primary-pane',
  primaryPaneId: 'primary-pane',
  defaultValueNow: 200
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
  flexBasis: '5px'
};

const primaryPaneStyle: React.CSSProperties = {
  flexGrow: 0,
  flexShrink: 0,
  overflow: 'auto',
  padding: '1em'
};

const secondaryPaneStyle: React.CSSProperties = {
  padding: '1em'
};

export const Container = ({
  type,
  min,
  max,
  orientation,
  ariaLabel,
  primaryPaneId,
  defaultValueNow,
  keyboardStep
}) => {
  const Splitter = () => {
    return (
      <SplitterContainer
        defaultValueNow={defaultValueNow}
        primaryPaneId={primaryPaneId}
        ariaLabel={ariaLabel}
        type={type}
        min={min}
        max={max}
        orientation={orientation}
        keyboardStep={keyboardStep}
      >
        {({ getSeparatorProps }: IUseSplitterReturnValue) => {
          const separatorProps = getSeparatorProps({
            style: {
              ...separatorStyle,
              cursor: orientation === SplitterOrientation.HORIZONTAL ? 'row-resize' : 'col-resize'
            }
          });

          return (
            <div
              style={{
                ...flexContainerStyle,
                flexDirection: orientation === SplitterOrientation.HORIZONTAL ? 'column' : 'row'
              }}
            >
              <div
                id="primary-pane"
                style={{
                  ...primaryPaneStyle,
                  flexBasis: `${separatorProps['aria-valuenow']}px`
                }}
              >
                Thai tabasco pepper cremini mushrooms crumbled lentils one bowl almonds delightful
                blueberry scones simmer muffins red pepper jalapeño cherry pasta chocolate
                bruschetta.
              </div>
              <hr {...separatorProps} />
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
  primaryPaneId,
  defaultValueNow,
  keyboardStep
}) => {
  const Splitter = () => {
    const { getSeparatorProps } = useSplitter({
      type,
      min,
      max,
      orientation,
      ariaLabel,
      primaryPaneId,
      defaultValueNow,
      keyboardStep
    });
    const separatorProps = getSeparatorProps({
      style: {
        ...separatorStyle,
        cursor: orientation === SplitterOrientation.HORIZONTAL ? 'row-resize' : 'col-resize'
      }
    });

    return (
      <div
        style={{
          ...flexContainerStyle,
          flexDirection: orientation === SplitterOrientation.HORIZONTAL ? 'column' : 'row'
        }}
      >
        <div
          id="primary-pane"
          style={{ ...primaryPaneStyle, flexBasis: `${separatorProps['aria-valuenow']}px` }}
        >
          Thai tabasco pepper cremini mushrooms crumbled lentils one bowl almonds delightful
          blueberry scones simmer muffins red pepper jalapeño cherry pasta chocolate bruschetta.
        </div>
        <hr {...separatorProps} />
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

export const Controlled = ({
  type,
  min,
  max,
  orientation,
  ariaLabel,
  primaryPaneId,
  keyboardStep
}) => {
  const Splitter = () => {
    const [valueNow, onChange] = useState(300);
    const { getSeparatorProps } = useSplitter({
      type,
      min,
      max,
      orientation,
      ariaLabel,
      primaryPaneId,
      valueNow,
      keyboardStep,
      onChange
    });
    const separatorProps = getSeparatorProps({
      style: {
        ...separatorStyle,
        cursor: orientation === SplitterOrientation.HORIZONTAL ? 'row-resize' : 'col-resize'
      }
    });

    return (
      <div
        style={{
          ...flexContainerStyle,
          flexDirection: orientation === SplitterOrientation.HORIZONTAL ? 'column' : 'row'
        }}
      >
        <div
          id="primary-pane"
          style={{ ...primaryPaneStyle, flexBasis: `${separatorProps['aria-valuenow']}px` }}
        >
          <p>Controlled ValueNow: {valueNow}</p>
          <p>
            Thai tabasco pepper cremini mushrooms crumbled lentils one bowl almonds delightful
            blueberry scones simmer muffins red pepper jalapeño cherry pasta chocolate bruschetta.
          </p>
        </div>
        <hr {...separatorProps} />
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
