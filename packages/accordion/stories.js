/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';

import { AccordionContainer, useAccordion } from './src';

storiesOf('Accordion Container', module)
  .addDecorator(withKnobs)
  .add('useSection', () => {
    const size = number('Sections', 5, { range: true, min: 1, max: 9 });
    const sections = Array(size)
      .fill()
      .map(() => createRef());

    const Accordion = ({ expandable = true, collapsible = true } = {}) => {
      const { getSectionProps } = useAccordion({
        expandedSections: [sections[0]],
        expandable,
        collapsible
      });

      return (
        <>
          {sections.map((section, index) => {
            const sectionProps = getSectionProps({ section, idPrefix: index });

            return (
              <div key={index} style={{ width: 300 }}>
                <h2 {...sectionProps.getHeaderProps({ role: null, ariaLevel: null })}>
                  <button
                    {...sectionProps.getTriggerProps({
                      role: null,
                      disabled: sectionProps.disabled,
                      style: { width: '100%', textAlign: 'unset' }
                    })}
                  >
                    {`Trigger ${index + 1}`}
                  </button>
                </h2>
                <section
                  {...sectionProps.getPanelProps({
                    role: null,
                    hidden: !sectionProps.expanded
                  })}
                >
                  {`[Panel ${index + 1}] `}
                  Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion
                  daikon amaranth tatsoi tomatillo melon azuki bean garlic.
                </section>
              </div>
            );
          })}
        </>
      );
    };

    return (
      <Accordion
        expandable={boolean('Expandable', true)}
        collapsible={boolean('Collapsible', true)}
      />
    );
  })
  .add('AccordionContainer', () => {
    const size = number('Sections', 5, { range: true, min: 1, max: 9 });
    const sections = Array(size)
      .fill()
      .map(() => createRef());

    const Accordion = ({ expandable = true, collapsible = true } = {}) => {
      return (
        <AccordionContainer
          expandedSections={[sections[0]]}
          expandable={expandable}
          collapsible={collapsible}
        >
          {({ getSectionProps }) => (
            <>
              {sections.map((section, index) => {
                const sectionProps = getSectionProps({ section, idPrefix: index });

                return (
                  <div key={index} style={{ width: 300 }}>
                    <div
                      {...sectionProps.getHeaderProps({
                        ariaLevel: 2,
                        style: { WebkitAppearance: 'button', padding: 1, cursor: 'pointer' }
                      })}
                    >
                      <div
                        {...sectionProps.getTriggerProps({
                          disabled: sectionProps.disabled
                        })}
                      >
                        {`Trigger ${index + 1}`}
                        {sectionProps.disabled && ' [disabled]'}
                      </div>
                    </div>
                    <p
                      {...sectionProps.getPanelProps({
                        hidden: !sectionProps.expanded
                      })}
                    >
                      {`[Panel ${index + 1}] `}
                      Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion
                      daikon amaranth tatsoi tomatillo melon azuki bean garlic.
                    </p>
                  </div>
                );
              })}
            </>
          )}
        </AccordionContainer>
      );
    };

    return (
      <Accordion
        expandable={boolean('Expandable', true)}
        collapsible={boolean('Collapsible', true)}
      />
    );
  });
