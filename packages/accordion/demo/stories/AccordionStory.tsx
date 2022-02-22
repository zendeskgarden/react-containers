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
  IUseAccordionProps,
  IUseAccordionReturnValue,
  useAccordion
} from '@zendeskgarden/container-accordion';

interface IComponentProps extends IUseAccordionReturnValue {
  sections: number[];
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
    {sections.map((section, index) => {
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

interface IProps extends IUseAccordionProps {
  sections: number[];
}

const Container = ({ sections, ...props }: IProps) => (
  <AccordionContainer {...props}>
    {containerProps => <Component sections={sections} {...containerProps} />}
  </AccordionContainer>
);

const Hook = ({ sections, ...props }: IProps) => {
  const hookProps = useAccordion(props);

  return <Component sections={sections} {...hookProps} />;
};

interface IArgs extends IUseAccordionProps {
  as: 'hook' | 'container';
  sections: number;
}

export const AccordionStory: Story<IArgs> = ({ as, sections, ...props }: IArgs) => {
  const Accordion = () => {
    const _sections = Array.from({ length: sections }, (_, index) => index);

    switch (as) {
      case 'container':
        return <Container sections={_sections} {...props} />;

      case 'hook':
      default:
        return <Hook sections={_sections} {...props} />;
    }
  };

  return <Accordion />;
};
