/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { AccordionContainer, useAccordion } from './src';

storiesOf('Accordion Container', module)
  .addDecorator(withKnobs)
  .add('useAccordion', () => {
    const Section = props => {
      const { getHeaderProps, getTriggerProps, getPanelProps, expanded } = useAccordion(props);

      return (
        <>
          <h2 {...getHeaderProps({ role: null, ariaLevel: null })}>
            <button
              {...getTriggerProps({
                role: null
              })}
            >{`Trigger ${props.id}`}</button>
          </h2>
          <section
            {...getPanelProps({
              role: null,
              hidden: !expanded
            })}
          >{`Panel ${props.id}`}</section>
        </>
      );
    };

    const total = number('Total Sections', 3);
    const values = [];

    for (let x = 1; x <= total; x++) {
      values.push(x);
    }

    return (
      <div>
        {values.map(value => (
          <Section expanded={value === 1} id={value} key={value} />
        ))}
      </div>
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
