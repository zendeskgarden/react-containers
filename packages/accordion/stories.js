/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef, useState } from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';

import { AccordionContainer, useAccordion, SectionContainer, useSection } from './src';

storiesOf('Accordion Container', module)
  .addDecorator(withKnobs)
  .add('useAccordion', () => {
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
        <div style={{ width: 300 }}>
          {sections.map((section, index) => {
            const sectionProps = getSectionProps({ section, idPrefix: index });

            return (
              <div key={index}>
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
  .add('useSection', () => {
    const Section = ({ expanded = false, disabled = false } = {}) => {
      const [isExpanded, setExpanded] = useState(expanded);
      const { getHeaderProps, getTriggerProps, getPanelProps } = useSection({
        expanded: isExpanded,
        onToggle: () => !disabled && setExpanded(!isExpanded)
      });

      return (
        <div style={{ width: 300 }}>
          <h2 {...getHeaderProps({ role: null, ariaLevel: null })}>
            <button
              {...getTriggerProps({
                role: null,
                disabled,
                style: { width: '100%', textAlign: 'unset' }
              })}
            >
              Trigger
            </button>
          </h2>
          <section
            {...getPanelProps({
              role: null,
              hidden: !isExpanded
            })}
          >
            [Panel] Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion
            daikon amaranth tatsoi tomatillo melon azuki bean garlic.
          </section>
        </div>
      );
    };

    return <Section expanded={boolean('Expanded', true)} disabled={boolean('Disabled', false)} />;
  })
  .add('AccordionContainer', () => {
    const size = number('Sections', 5, { range: true, min: 1, max: 9 });
    const sections = Array(size)
      .fill()
      .map(() => createRef());

    const Accordion = ({ expandable = true, collapsible = true } = {}) => (
      <AccordionContainer
        expandedSections={[sections[0]]}
        expandable={expandable}
        collapsible={collapsible}
      >
        {({ getSectionProps }) => (
          <div style={{ width: 300 }}>
            {sections.map((section, index) => {
              const sectionProps = getSectionProps({ section, idPrefix: index });

              return (
                <div key={index}>
                  <div
                    {...sectionProps.getHeaderProps({
                      ariaLevel: 2,
                      style: { WebkitAppearance: 'button', padding: 1, cursor: 'pointer' }
                    })}
                  >
                    <div
                      {...sectionProps.getTriggerProps({
                        disabled: sectionProps.disabled,
                        style: { opacity: sectionProps.disabled ? 0.4 : 1 }
                      })}
                    >
                      {`Trigger ${index + 1}`}
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
  })
  .add('SectionContainer', () => {
    const Section = ({ expanded = false, disabled = false } = {}) => {
      const [isExpanded, setExpanded] = useState(expanded);

      return (
        <SectionContainer
          expanded={isExpanded}
          disabled={disabled}
          onToggle={() => !disabled && setExpanded(!isExpanded)}
        >
          {({ getHeaderProps, getTriggerProps, getPanelProps }) => (
            <div style={{ width: 300 }}>
              <div
                {...getHeaderProps({
                  ariaLevel: 2,
                  style: { WebkitAppearance: 'button', padding: 1, cursor: 'pointer' }
                })}
              >
                <div
                  {...getTriggerProps({
                    disabled,
                    style: { opacity: disabled ? 0.4 : 1 }
                  })}
                >
                  Trigger
                </div>
              </div>
              <p
                {...getPanelProps({
                  hidden: !isExpanded
                })}
              >
                [Panel] Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion
                daikon amaranth tatsoi tomatillo melon azuki bean garlic.
              </p>
            </div>
          )}
        </SectionContainer>
      );
    };

    return <Section expanded={boolean('Expanded', true)} disabled={boolean('Disabled', false)} />;
  });
