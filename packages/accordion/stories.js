/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';

import { AccordionContainer, useAccordion } from './src';

storiesOf('Accordion Container', module)
  .addDecorator(withKnobs)
  .add('useAccordion', () => {
    // eslint-disable-next-line react/prop-types
    const Accordion = ({ sections, expandable = true, collapsible = true }) => {
      const [_sections, setSections] = useState(sections);

      const handleToggle = index => {
        setSections(
          _sections.map((section, _index) => {
            if (index === _index) {
              section.expanded = collapsible ? !section.expanded : true;
            } else if (!expandable) {
              section.expanded = false;
            }

            return {
              id: section.id,
              expanded: section.expanded
            };
          })
        );
      };

      return (
        <div>
          {_sections.map((section, index) => (
            <Section
              expanded={section.expanded}
              disabled={section.expanded && !collapsible}
              id={section.id}
              key={section.id}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      );
    };

    const Section = ({ expanded, disabled, id, onToggle }) => {
      const { getHeaderProps, getTriggerProps, getPanelProps } = useAccordion(id);

      return (
        <>
          <h2 {...getHeaderProps({ role: null, ariaLevel: null })}>
            <button
              {...getTriggerProps({
                role: null,
                ariaExpanded: expanded,
                disabled,
                onClick: () => {
                  onToggle();
                }
              })}
            >
              {`Trigger ${id}`}
              {disabled && ' [disabled]'}
            </button>
          </h2>
          <section
            {...getPanelProps({
              role: null,
              ariaHidden: !expanded,
              hidden: !expanded
            })}
          >{`Panel ${id}`}</section>
        </>
      );
    };

    const sections = [];

    for (let x = 0; x < number('Total Sections', 3); x++) {
      sections.push({
        id: x,
        expanded: x === 0
      });
    }

    return (
      <Accordion
        sections={sections}
        expandable={boolean('Expandable', true)}
        collapsible={boolean('Collapsible', true)}
      />
    );
  })
  .add('AccordionContainer', () => (
    <AccordionContainer>
      {({ getHeaderProps, getTriggerProps, getPanelProps, expanded }) => (
        <>
          <div {...getHeaderProps({ ariaLevel: 2 })}>
            <div {...getTriggerProps()}>Trigger</div>
          </div>
          <div {...getPanelProps({ hidden: !expanded })}>Panel</div>
        </>
      )}
    </AccordionContainer>
  ));
