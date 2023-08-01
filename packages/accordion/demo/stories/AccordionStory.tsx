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

type ISectionValue = number;

interface IComponentProps<T = ISectionValue> extends IUseAccordionReturnValue<T> {
  sections: IUseAccordionProps<T>['sections'];
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
    {sections!.map(value => {
      const disabled = disabledSections.indexOf(value) !== -1;
      const hidden = expandedSections.indexOf(value) === -1;

      return (
        <div key={value}>
          <div {...getHeaderProps({ 'aria-level': 2 })}>
            <button
              {...getTriggerProps({
                value,
                role: null,
                tabIndex: null,
                disabled
              })}
              className="text-left w-full"
              type="button"
            >
              {`Trigger ${value + 1}`}
            </button>
          </div>
          <section
            {...getPanelProps({
              value,
              role: null,
              hidden
            })}
          >
            {`[Panel ${value + 1}] `}
            Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon
            amaranth tatsoi tomatillo melon azuki bean garlic.
          </section>
        </div>
      );
    })}
  </div>
);

const Container = (props: IAccordionContainerProps<ISectionValue>) => (
  <AccordionContainer {...props}>
    {/* eslint-disable-next-line react/destructuring-assignment */}
    {containerProps => <Component sections={props.sections} {...containerProps} />}
  </AccordionContainer>
);

const Hook = (props: IUseAccordionProps<ISectionValue>) => {
  const hookProps = useAccordion(props);

  // eslint-disable-next-line react/destructuring-assignment
  return <Component sections={props.sections} {...hookProps} />;
};

interface IArgs extends IAccordionContainerProps<ISectionValue> {
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
