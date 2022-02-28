/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { forwardRef, RefObject } from 'react';
import { Story } from '@storybook/react';
import { PALETTE } from '@zendeskgarden/react-theming';
import {
  FocusVisibleContainer,
  IFocusVisibleContainerProps,
  IUseFocusVisibleProps,
  useFocusVisible
} from '@zendeskgarden/container-focusvisible';
import { createGlobalStyle } from 'styled-components';

interface IComponentProps {
  className?: IUseFocusVisibleProps['className'];
  dataAttribute?: IUseFocusVisibleProps['dataAttribute'];
}

const Component = forwardRef<HTMLDivElement, IComponentProps>(
  ({ className, dataAttribute }, ref) => {
    const GlobalStyle = createGlobalStyle`
    :focus {
      outline: none;
    }

    .${className},
    [${dataAttribute}='true'] {
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
    return (
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
          <br />
          <blockquote className="my-5" contentEditable="true">
            <p>Content editable block quote</p>
          </blockquote>
          <div tabIndex={0}>Custom [tabindex=&quot;0&quot;]</div>
        </div>
      </>
    );
  }
);

Component.displayName = 'Component';

const Container = ({ className, dataAttribute }: IFocusVisibleContainerProps) => (
  <FocusVisibleContainer className={className} dataAttribute={dataAttribute}>
    {({ ref }) => <Component className={className} dataAttribute={dataAttribute} ref={ref} />}
  </FocusVisibleContainer>
);

const Hook = ({ scope, ...props }: IUseFocusVisibleProps) => {
  useFocusVisible({ scope, ...props });

  const ref = scope as RefObject<HTMLDivElement>;

  return <Component {...props} ref={ref} />;
};

interface IArgs extends IFocusVisibleContainerProps {
  as: 'hook' | 'container';
  scope: RefObject<HTMLElement>;
}

export const FocusVisibleStory: Story<IArgs> = ({ as, ...props }) => {
  const FocusVisible = () => {
    switch (as) {
      case 'container':
        return <Container {...props} />;

      case 'hook':
      default:
        return <Hook {...props} />;
    }
  };

  return <FocusVisible />;
};
