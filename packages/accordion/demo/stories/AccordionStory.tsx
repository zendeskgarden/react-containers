/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story } from '@storybook/react';
import {
  AccordionContainer,
  IAccordionContainerProps,
  IUseAccordionProps,
  IUseAccordionReturnValue,
  useAccordion
} from '@zendeskgarden/container-accordion';

interface IComponentProps extends IUseAccordionReturnValue {
  sections: IUseAccordionProps['sections'];
}

const Component = ({
  sections,
  disabledSections,
  expandedSections,
  getHeaderProps,
  getTriggerProps,
  getPanelProps
}: IComponentProps) => (
  <div style={{ width: 300 }}>
    {sections!.map((section, index) => {
      const disabled = disabledSections.indexOf(index) !== -1;
      const hidden = expandedSections.indexOf(index) === -1;

      return (
        <div key={section}>
          <div {...getHeaderProps({ ariaLevel: 2 })}>
            <button
              {...getTriggerProps({
                index,
                role: null,
                tabIndex: null,
                disabled
              })}
              className="text-left w-full"
              type="button"
            >
              {`Trigger ${index + 1}`}
            </button>
          </div>
          <section
            {...getPanelProps({
              index,
              role: null,
              hidden
            })}
          >
            {`[Panel ${index + 1}] `}
            Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon
            amaranth tatsoi tomatillo melon azuki bean garlic.
          </section>
        </div>
      );
    })}
  </div>
);

const Container = (props: IAccordionContainerProps) => (
  <AccordionContainer {...props}>
    {/* eslint-disable-next-line react/destructuring-assignment */}
    {containerProps => <Component sections={props.sections} {...containerProps} />}
  </AccordionContainer>
);

const Hook = (props: IUseAccordionProps) => {
  const hookProps = useAccordion(props);

  // eslint-disable-next-line react/destructuring-assignment
  return <Component sections={props.sections} {...hookProps} />;
};

interface IArgs extends IAccordionContainerProps {
  as: 'hook' | 'container';
}

export const AccordionStory: Story<IArgs> = ({ as, ...props }: IArgs) => {
  const Accordion = () => {
    switch (as) {
      case 'container':
        return <Container {...props} />;

      case 'hook':
      default:
        return <Hook {...props} />;
    }
  };

  return <Accordion />;
};
