/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';

import { AccordionContainer, useAccordion, IUseAccordionReturnValue } from './src';

storiesOf('Accordion Container', module)
  .addDecorator(withKnobs)
  .add('useAccordion', () => {
    const size = number('Sections', 5, { range: true, min: 1, max: 9 });
    const sections = Array(size)
      .fill(undefined)
      .map(() => createRef());

    const Accordion = ({ expandable = true, collapsible = true } = {}) => {
      const {
        getHeaderProps,
        getTriggerProps,
        getPanelProps,
        expandedSections,
        disabledSections
      } = useAccordion({ expandable, collapsible });

      return (
        <div style={{ width: 300 }}>
          {sections.map((section, index) => {
            const disabled = disabledSections.indexOf(index) !== -1;
            const hidden = expandedSections.indexOf(index) === -1;

            return (
              <div key={section as any}>
                <h2 {...getHeaderProps({ role: null, ariaLevel: null })}>
                  <button
                    {...getTriggerProps({
                      index,
                      role: null,
                      tabIndex: null,
                      disabled,
                      style: { width: '100%', textAlign: 'inherit' }
                    })}
                  >
                    {`Trigger ${index + 1}`}
                  </button>
                </h2>
                <section
                  {...getPanelProps({
                    index,
                    role: null,
                    hidden
                  })}
                >
                  {`[Panel ${index + 1}] `}
                  Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion
                  daikon amaranth tatsoi tomatillo melon azuki bean garlic.
                </section>
              </div>
            );
          })}
        </div>
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
      .fill(undefined)
      .map(() => createRef());

    const Accordion = ({ expandable = true, collapsible = true } = {}) => (
      <AccordionContainer expandable={expandable} collapsible={collapsible}>
        {({
          getHeaderProps,
          getTriggerProps,
          getPanelProps,
          expandedSections,
          disabledSections
        }: IUseAccordionReturnValue) => (
          <div style={{ width: 300 }}>
            {sections.map((section, index) => {
              const disabled = disabledSections.indexOf(index) !== -1;
              const hidden = expandedSections.indexOf(index) === -1;

              return (
                <div key={section as any}>
                  <div {...getHeaderProps({ ariaLevel: 2 })}>
                    <div
                      {...getTriggerProps({
                        index,
                        disabled,
                        style: {
                          WebkitAppearance: 'button',
                          border: '1px solid',
                          opacity: disabled ? 0.4 : 1,
                          padding: 1,
                          cursor: 'pointer'
                        }
                      })}
                    >
                      {`Trigger ${index + 1}`}
                    </div>
                  </div>
                  <p
                    {...getPanelProps({
                      index,
                      hidden
                    })}
                  >
                    {`[Panel ${index + 1}] `}
                    Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion
                    daikon amaranth tatsoi tomatillo melon azuki bean garlic.
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </AccordionContainer>
    );

    return (
      <Accordion
        expandable={boolean('Expandable', true)}
        collapsible={boolean('Collapsible', true)}
      />
    );
  });
