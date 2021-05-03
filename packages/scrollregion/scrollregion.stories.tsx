/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef, useState, useMemo, forwardRef, HTMLAttributes } from 'react';
import styled from 'styled-components';
import mergeRefs from 'react-merge-refs';
import { useFocusVisible } from '@zendeskgarden/container-focusvisible';
import { ScrollRegionContainer, useScrollRegion } from './src';

const StyledCustomFocus = styled.div`
  height: 200px;
  width: 300px;
  overflow-y: auto;

  :focus {
    outline: none;
  }

  &[data-garden-focus-visible] {
    outline: 2px dashed red;
  }
`;

export const Container = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const focusVisibleRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);

  useFocusVisible({ scope: focusVisibleRef });

  return (
    <ScrollRegionContainer containerRef={containerRef} dependency={overflow}>
      {containerTabIndex => (
        <div ref={focusVisibleRef} style={{ margin: '2px' }}>
          <input
            type="checkbox"
            id="container-toggle"
            onChange={e => setOverflow(e.target.checked)}
            style={{ margin: '4px' }}
          />
          <label htmlFor="container-toggle">Toggle overflow</label>
          <StyledCustomFocus ref={containerRef} tabIndex={containerTabIndex}>
            <p style={{ lineHeight: overflow ? '32px' : 'initial' }}>
              Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi
              amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale.
              Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water
              spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin.
            </p>
          </StyledCustomFocus>
        </div>
      )}
    </ScrollRegionContainer>
  );
};

export const Hook = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const focusVisibleRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);
  const containerTabIndex = useScrollRegion({ containerRef, dependency: overflow });

  useFocusVisible({ scope: focusVisibleRef });

  return (
    <div ref={focusVisibleRef} style={{ margin: '2px' }}>
      <input
        type="checkbox"
        id="hook-toggle"
        onChange={e => setOverflow(e.target.checked)}
        style={{ margin: '4px' }}
      />
      <label htmlFor="hook-toggle">Toggle overflow</label>
      <StyledCustomFocus ref={containerRef} tabIndex={containerTabIndex}>
        <p style={{ lineHeight: overflow ? '32px' : 'initial' }}>
          Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth
          water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato
          scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel
          kombu maize bamboo shoot green bean swiss chard seakale pumpkin.
        </p>
      </StyledCustomFocus>
    </div>
  );
};

const Content = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ ...props }, ref) => {
  const [hasPadding, setHasPadding] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mergedRefs = mergeRefs([ref, containerRef]);

  const dependency = useMemo(() => {
    return [hasPadding, props.children];
  }, [hasPadding, props.children]);

  const containerTabIndex = useScrollRegion({ containerRef, dependency });

  return (
    <>
      <input
        type="checkbox"
        id="padding-toggle"
        style={{ margin: '12px 8px' }}
        onChange={e => setHasPadding(e.target.checked)}
      />
      <label htmlFor="padding-toggle">Toggle padding</label>
      <StyledCustomFocus
        ref={mergedRefs}
        tabIndex={containerTabIndex}
        style={{ height: 50, width: 200, border: '1px solid #000' }}
      >
        <div style={{ padding: hasPadding ? '18px 12px' : 0 }}>{props.children}</div>
      </StyledCustomFocus>
    </>
  );
});

export const Advanced = () => {
  const focusVisibleRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(2);
  const list = Array.from(Array(count).keys());

  useFocusVisible({ scope: focusVisibleRef });

  return (
    <div ref={focusVisibleRef} style={{ margin: '2px' }}>
      <button onClick={() => setCount(count + 1)}>Add children</button>
      <Content>
        {list.map((n: number) => (
          <div key={n}>{n + 1}) Turnip greens ricebean</div>
        ))}
      </Content>
    </div>
  );
};

Content.displayName = 'Content';

Container.storyName = 'ScrollRegionContainer';

Hook.storyName = 'useScrollRegion';

Advanced.storyName = 'advanced scroll region';

Advanced.parameters = {
  docs: {
    description: {
      story: `This example demonstrates a scroll region with multiple dependencies that change the region's layout.
      In this example, \`children\` and \`hasPadding\` can cause overflow. These values need be memozied as an array and then passed to the
      \`useScrollRegion\`'s \`dependency\` option.`
    }
  }
};

Hook.parameters = {
  docs: {
    description: {
      story: `The \`useScrollRegion\` hook implements a scroll region.`
    }
  }
};

export default {
  title: 'ScrollRegion Container',
  component: ScrollRegionContainer,
  parameters: {
    layout: 'centered',
    componentSubtitle: `A container component which wraps the useScrollRegion hook.`
  }
};
