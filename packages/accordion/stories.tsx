/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef, useState } from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import {
  AccordionContainer,
  useAccordion,
  IUseAccordionReturnValue,
  IUseAccordionProps
} from './src';

storiesOf('Accordion Container', module)
  .addDecorator(withKnobs)
  .add('useAccordion (uncontrolled)', () => {
    const size = number('Sections', 5, { range: true, min: 1, max: 9 });
    const defaultExpandedSections = number('defaultExpandedSections', 0, { min: 0, max: size - 1 });
    const sectionRefs = Array(size)
      .fill(undefined)
      .map(() => createRef());

    const Accordion = ({ collapsible = false, expandable = false } = {}) => {
      const { expandedSections, getHeaderProps, getTriggerProps, getPanelProps } = useAccordion({
        defaultExpandedSections,
        collapsible,
        expandable,
        onChange: action('Selected panel')
      });

      return (
        <div style={{ width: 300 }}>
          {sectionRefs.map((sectionRef, index) => {
            const hidden = Array.isArray(expandedSections)
              ? expandedSections.indexOf(index) === -1
              : index !== expandedSections;

            return (
              <div key={index}>
                <h2 {...getHeaderProps({ role: null, ariaLevel: null })}>
                  <button
                    {...getTriggerProps({
                      index,
                      role: null,
                      tabIndex: null,
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
                  {`[Panel ${index + 1}]`}
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
        expandable={boolean('expandable', true)}
        collapsible={boolean('collapsible', true)}
      />
    );
  })
  .add('useAccordion (controlled)', () => {
    const size = number('Sections', 3, { range: true, min: 1, max: 9 });
    const controlledIndex = number('index', 0, { range: false, min: 0, max: size - 1 });
    const sections = Array(size)
      .fill(undefined)
      .map((section, index) => index);
    const sectionRefs = sections.map(() => createRef());

    const Accordion = () => {
      const [expandedSections, setExpandedSections] = useState<number | number[]>(controlledIndex);
      const { getHeaderProps, getTriggerProps, getPanelProps } = useAccordion({
        expandedSections,
        onChange: setExpandedSections
      });

      return (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {sections.length >= 2 && (
              <button onClick={() => setExpandedSections(1)}>Expand Trigger 2</button>
            )}
            <button onClick={() => setExpandedSections(sections)}>Expand All</button>
            <button onClick={() => setExpandedSections([])}>Collapse All</button>
          </div>

          <div style={{ width: 300, marginTop: '20px' }}>
            {sectionRefs.map((sectionRef, index) => {
              const hidden = Array.isArray(expandedSections)
                ? !expandedSections.includes(index)
                : index !== expandedSections;

              return (
                <div key={index}>
                  <h2 {...getHeaderProps({ role: null, ariaLevel: null })}>
                    <button
                      {...getTriggerProps({
                        index,
                        role: null,
                        tabIndex: null,
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
                    {`[Panel ${index + 1}]`}
                    Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion
                    daikon amaranth tatsoi tomatillo melon azuki bean garlic.
                  </section>
                </div>
              );
            })}
          </div>
        </>
      );
    };

    return <Accordion />;
  })
  .add('AccordionContainer (uncontrolled)', () => {
    const size = number('Sections', 5, { range: true, min: 1, max: 9 });
    const sectionRefs = Array(size)
      .fill(undefined)
      .map(() => createRef());

    const Accordion = ({ expandable, collapsible }: IUseAccordionProps) => (
      <AccordionContainer
        onChange={action('Selected panel')}
        expandable={expandable}
        collapsible={collapsible}
      >
        {({
          getHeaderProps,
          getTriggerProps,
          getPanelProps,
          expandedSections
        }: IUseAccordionReturnValue) => {
          return (
            <div style={{ width: 300 }}>
              {sectionRefs.map((sectionRef, index) => {
                const hidden = Array.isArray(expandedSections)
                  ? expandedSections.indexOf(index) === -1
                  : index !== expandedSections;

                return (
                  <div>
                    <div {...getHeaderProps({ ariaLevel: 2 })}>
                      <div
                        {...getTriggerProps({
                          index,
                          style: {
                            WebkitAppearance: 'button',
                            border: '1px solid',
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
                      {`[Panel ${index + 1}]`}
                      Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion
                      daikon amaranth tatsoi tomatillo melon azuki bean garlic.
                    </p>
                  </div>
                );
              })}
            </div>
          );
        }}
      </AccordionContainer>
    );

    return (
      <Accordion
        expandable={boolean('expandable', true)}
        collapsible={boolean('collapsible', true)}
      />
    );
  })
  .add('AccordionContainer (controlled)', () => {
    const size = number('Sections', 3, { range: true, min: 1, max: 9 });
    const controlledIndex = number('index', 0, { range: false, min: 0, max: size - 1 });
    const sections = Array(size)
      .fill(undefined)
      .map((section, index) => index);
    const sectionRefs = sections.map(() => createRef());

    const Accordion = () => {
      const [expandedSections, setExpandedSections] = useState<number | number[]>(controlledIndex);

      return (
        <AccordionContainer
          expandedSections={expandedSections}
          onChange={index => setExpandedSections(index)}
        >
          {({ getHeaderProps, getTriggerProps, getPanelProps }: IUseAccordionReturnValue) => {
            return (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {sections.length >= 2 && (
                    <button onClick={() => setExpandedSections(1)}>Expand Trigger 2</button>
                  )}
                  <button onClick={() => setExpandedSections(sections)}>Expand All</button>
                  <button onClick={() => setExpandedSections([])}>Collapse All</button>
                </div>

                <div style={{ width: 300, marginTop: '20px' }}>
                  {sectionRefs.map((sectionRef, index) => {
                    const hidden = Array.isArray(expandedSections)
                      ? !expandedSections.includes(index)
                      : index !== expandedSections;

                    return (
                      <div key={index}>
                        <div {...getHeaderProps({ ariaLevel: 2 })}>
                          <div
                            {...getTriggerProps({
                              index,
                              style: {
                                WebkitAppearance: 'button',
                                border: '1px solid',
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
                          {`[Panel ${index + 1}]`}
                          Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh
                          onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            );
          }}
        </AccordionContainer>
      );
    };

    return <Accordion />;
  });
