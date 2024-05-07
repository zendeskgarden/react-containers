/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { forwardRef } from 'react';
import { StoryFn } from '@storybook/react';
import { createGlobalStyle } from 'styled-components';
import { PALETTE } from '@zendeskgarden/react-theming';
import {
  FocusVisibleContainer,
  IFocusVisibleContainerProps,
  IUseFocusVisibleProps,
  useFocusVisible
} from '@zendeskgarden/container-focusvisible';

const GlobalStyle = createGlobalStyle`
  :focus {
    outline: none;
  }

  .garden-focus-visible,
  [data-garden-focus-visible='true'] {
    box-shadow: 0 0 0 2px ${PALETTE.green[400]};
  }

  blockquote p::before {
    content: '“';
  }

  blockquote p::after {
    content: '”';
  }
`;

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
const Component = forwardRef<HTMLDivElement, unknown>((_, ref) => (
  <>
    <GlobalStyle />
    <div ref={ref}>
      <a href="#test">Anchor</a>
      <br />
      <button className="my-5 px-2 py-1" type="button">
        Button
      </button>
      <br />
      <label>
        <span>Input</span>
        <input className="ml-1" />
      </label>
      <div className="my-5" tabIndex={0}>
        Custom [tabindex=&quot;0&quot;]
      </div>
      <label>
        <span className="align-top">Textarea</span>
        <textarea className="ml-1" />
      </label>
      <br />
      <blockquote className="my-5" contentEditable suppressContentEditableWarning>
        <p>Content editable block quote</p>
      </blockquote>
    </div>
  </>
));

Component.displayName = 'Component';

const Container = (props: IFocusVisibleContainerProps) => (
  <FocusVisibleContainer {...props}>{({ ref }) => <Component ref={ref} />}</FocusVisibleContainer>
);

const Hook = ({ scope, ...props }: IUseFocusVisibleProps<HTMLDivElement>) => {
  useFocusVisible({ scope, ...props });

  return <Component ref={scope} />;
};

interface IArgs extends IUseFocusVisibleProps<HTMLDivElement> {
  as: 'hook' | 'container';
}

export const FocusVisibleStory: StoryFn<IArgs> = ({ as, ...props }) => {
  const FocusVisible = () => {
    switch (as) {
      case 'container':
        return <Container />;

      case 'hook':
      default:
        return <Hook {...props} />;
    }
  };

  return <FocusVisible />;
};
