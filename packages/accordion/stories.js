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

const getToggled = (toggledIndex, toggledState, expandable, collapsible) => {
  return toggledState.map((_, index) => {
    let retVal;

    if (index === toggledIndex) {
      retVal = collapsible ? !toggledState[index] : true;
    } else if (expandable) {
      retVal = toggledState[index];
    } else {
      retVal = false;
    }

    return retVal;
  });
};

storiesOf('Accordion Container', module)
  .addDecorator(withKnobs)
  .add('useAccordion', () => {
    const size = number('Sections', 5, { range: true, min: 1, max: 9 });
    const sections = Array(size).fill(false);

    const Accordion = ({ expandable = true, collapsible = true } = {}) => {
      const [toggled, setToggled] = useState(sections);

      const handleToggle = index => {
        const state = getToggled(index, toggled, expandable, collapsible);

        setToggled(state);
      };

      const { getHeaderProps, getTriggerProps, getPanelProps } = useAccordion();

      return (
        <>
          {sections.map((_, index) => {
            const triggerId = `trigger-${index}`;
            const panelId = `panel-${index}`;
            const expanded = toggled[index];

            return (
              <div key={index} style={{ width: 300 }}>
                <h2 {...getHeaderProps({ role: null, ariaLevel: null })}>
                  <button
                    {...getTriggerProps({
                      id: triggerId,
                      panelId,
                      role: null,
                      ariaExpanded: expanded,
                      ariaDisabled: expanded && !collapsible,
                      disabled: expanded && !collapsible,
                      onToggle: () => handleToggle(index),
                      style: { width: '100%', textAlign: 'unset' }
                    })}
                  >
                    {`Trigger ${index + 1}`}
                  </button>
                </h2>
                <section
                  {...getPanelProps({
                    id: panelId,
                    triggerId,
                    role: null,
                    ariaHidden: !expanded,
                    hidden: !expanded
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
    const sections = Array(size).fill(false);

    const Accordion = ({ expandable = true, collapsible = true } = {}) => {
      const [toggled, setToggled] = useState(sections);

      const handleToggle = index => {
        const state = getToggled(index, toggled, expandable, collapsible);

        setToggled(state);
      };

      return (
        <AccordionContainer>
          {({ getHeaderProps, getTriggerProps, getPanelProps }) => (
            <>
              {sections.map((_, index) => {
                const triggerId = `trigger-${index}`;
                const panelId = `panel-${index}`;
                const expanded = toggled[index];

                return (
                  <div key={index} style={{ width: 300 }}>
                    <div
                      {...getHeaderProps({
                        ariaLevel: 2,
                        style: { WebkitAppearance: 'button', padding: 1, cursor: 'pointer' }
                      })}
                    >
                      <div
                        {...getTriggerProps({
                          id: triggerId,
                          panelId,
                          ariaExpanded: expanded,
                          ariaDisabled: expanded && !collapsible,
                          disabled: expanded && !collapsible,
                          onToggle: () => handleToggle(index)
                        })}
                      >
                        {`Trigger ${index + 1}`}
                      </div>
                    </div>
                    <p
                      {...getPanelProps({
                        id: panelId,
                        triggerId,
                        ariaHidden: !expanded,
                        hidden: !expanded
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
