/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { CSSProperties } from 'react';
import { AccordionContainer, useAccordion, IUseAccordionReturnValue } from './src';

const visuallyHidden: CSSProperties = {
  position: 'absolute',
  border: '0',
  clip: 'rect(1px, 1px, 1px, 1px)',
  padding: '0',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  whiteSpace: 'nowrap'
};

export const Container = ({ sections, expandable, collapsible }) => {
  const _sections = Array(sections)
    .fill(undefined)
    .map((s, i) => i);

  const Accordion = () => (
    <AccordionContainer expandable={expandable} collapsible={collapsible}>
      {({
        getHeaderProps,
        getTriggerProps,
        getPanelProps,
        expandedSections,
        disabledSections
      }: IUseAccordionReturnValue) => (
        <div style={{ width: 300 }}>
          {_sections.map((section, index) => {
            const disabled = disabledSections.indexOf(index) !== -1;
            const hidden = expandedSections.indexOf(index) === -1;

            return (
              <div key={section}>
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
                    style: hidden ? visuallyHidden : null
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

  return <Accordion />;
};

export const Hook = ({ sections, expandable, collapsible }) => {
  const _sections = Array(sections)
    .fill(undefined)
    .map((s, i) => i);

  const Accordion = () => {
    const { getHeaderProps, getTriggerProps, getPanelProps, expandedSections, disabledSections } =
      useAccordion({ expandable, collapsible });

    return (
      <div style={{ width: 300 }}>
        {_sections.map((section, index) => {
          const disabled = disabledSections.indexOf(index) !== -1;
          const hidden = expandedSections.indexOf(index) === -1;

          return (
            <div key={section}>
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
                  style: hidden ? visuallyHidden : null
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
  };

  return <Accordion />;
};

const ARG_TYPES = {
  sections: {
    control: { type: 'range', min: 1, max: 9 }
  }
};

const ARGS = {
  sections: 5,
  expandable: true,
  collapsible: true
};

Container.storyName = 'AccordionContainer';

Container.argTypes = ARG_TYPES;

Container.args = ARGS;

Hook.storyName = 'useAccordion';

Hook.argTypes = ARG_TYPES;

Hook.args = ARGS;

Hook.parameters = {
  docs: {
    description: {
      story: `The \`useAccordion\` hook manages toggle state and required accessibility
      attributes for a group of sections.`
    }
  }
};

export default {
  component: AccordionContainer,
  title: 'Accordion Container',
  parameters: {
    layout: 'centered',
    componentSubtitle: `A container component which wraps the useAccordion hook.`
  }
};
