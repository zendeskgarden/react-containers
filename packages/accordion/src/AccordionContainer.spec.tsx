/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, fireEvent, screen } from '@testing-library/react';
import { KEYS } from '@zendeskgarden/container-utilities';
import { AccordionContainer, IUseAccordionReturnValue, IUseAccordionProps } from './';

describe('AccordionContainer', () => {
  const user = userEvent.setup();

  const sections = Array(3)
    .fill(undefined)
    .map((s, i) => i);
  const CONTAINER_ID_PREFIX = 'test';

  it('renders with expected return values', () => {
    const { getByTestId, getByText } = render(
      <AccordionContainer sections={sections}>
        {({ expandedSections, disabledSections }: IUseAccordionReturnValue<number>) => (
          <div data-test-id="test" hidden={expandedSections.includes(0)}>
            <button disabled={disabledSections.length !== 0}>Trigger</button>
          </div>
        )}
      </AccordionContainer>
    );
    const test = getByTestId('test');
    const triggerButton = getByText('Trigger');

    expect(test).toHaveAttribute('hidden');
    expect(triggerButton).not.toHaveAttribute('disabled');
  });

  const BasicExample = (props: Omit<IUseAccordionProps<number>, 'sections'> = {}) => (
    <AccordionContainer idPrefix={CONTAINER_ID_PREFIX} sections={sections} {...props}>
      {({ getHeaderProps, getTriggerProps, getPanelProps }) => (
        <>
          {sections.map(section => {
            return (
              <div key={section}>
                <div data-test-id="header" {...getHeaderProps({ 'aria-level': 1 })}>
                  <div data-test-id="trigger" {...getTriggerProps({ value: section })}>
                    Trigger
                  </div>
                </div>

                <div data-test-id="panel" {...getPanelProps({ value: section })}>
                  Panel
                </div>
              </div>
            );
          })}
        </>
      )}
    </AccordionContainer>
  );

  const AdvancedExample = () => (
    <AccordionContainer sections={sections}>
      {({ getHeaderProps, getTriggerProps, getPanelProps }) => (
        <>
          {sections.map(section => {
            return (
              <div key={section}>
                <h2
                  data-test-id="header"
                  {...getHeaderProps({
                    role: null,
                    // @ts-expect-error for testing purposes only
                    'aria-level': null
                  })}
                >
                  <button
                    data-test-id="trigger"
                    {...(getTriggerProps({
                      value: section,
                      role: null,
                      // setting to `null` when semantically implicit (button)
                      tabIndex: null as any
                    }) as any)}
                  >
                    Trigger
                  </button>
                </h2>
                <section
                  data-test-id="panel"
                  {...getPanelProps({
                    value: section,
                    role: null
                  })}
                >
                  Panel
                </section>
              </div>
            );
          })}
        </>
      )}
    </AccordionContainer>
  );

  it('sets default expanded sections in an uncontrolled hook', () => {
    const defaultExpandedSections = [0, 1, 2];

    render(<BasicExample defaultExpandedSections={defaultExpandedSections} />);

    const triggers = screen.getAllByRole('button');
    const panels = screen.getAllByLabelText('Trigger');

    triggers.forEach(trigger => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
    panels.forEach(panel => expect(panel).toBeVisible());
  });

  it('calls onChange with correct sections on section selection', async () => {
    const onChangeSpy = jest.fn();

    const { getAllByTestId } = render(<BasicExample onChange={onChangeSpy} />);
    const triggers = getAllByTestId('trigger');

    await user.click(triggers[2]);

    expect(onChangeSpy).toHaveBeenCalledWith(2);
  });

  describe('getHeaderProps', () => {
    it('applies the correct accessibility role', () => {
      const { getAllByTestId } = render(<BasicExample />);

      getAllByTestId('header').forEach(header => {
        expect(header).toHaveAttribute('role', 'heading');
      });
    });

    it('does not apply the accessibility role when semantically implicit', () => {
      const { getAllByTestId } = render(<AdvancedExample />);

      getAllByTestId('header').forEach(header => {
        expect(header).not.toHaveAttribute('role');
      });
    });

    it('applies the correct accessibility level', () => {
      const { getAllByTestId } = render(<BasicExample />);

      getAllByTestId('header').forEach(header => {
        expect(header).toHaveAttribute('aria-level', '1');
      });
    });

    it('does not apply the accessibility level when semantically implicit', () => {
      const { getAllByTestId } = render(<AdvancedExample />);

      getAllByTestId('header').forEach(header => {
        expect(header).not.toHaveAttribute('aria-level');
      });
    });
  });

  describe('getTriggerProps', () => {
    it('applies the correct ID', () => {
      const { getAllByTestId } = render(<BasicExample />);

      getAllByTestId('trigger').forEach((trigger, index) => {
        expect(trigger).toHaveAttribute('id', `${CONTAINER_ID_PREFIX}--trigger:${index}`);
      });
    });

    it('applies the correct accessibility ID for the controlled panel', () => {
      const { getAllByTestId } = render(<BasicExample />);
      const triggers = getAllByTestId('trigger');
      const panels = getAllByTestId('panel');

      triggers.forEach((trigger, index) => {
        expect(trigger).toHaveAttribute('aria-controls', panels[index].id);
      });
    });

    it('applies the correct accessibility role', () => {
      const { getAllByTestId } = render(<BasicExample />);

      getAllByTestId('trigger').forEach(trigger => {
        expect(trigger).toHaveAttribute('role', 'button');
      });
    });

    it('does not apply the accessibility role when semantically implicit', () => {
      const { getAllByTestId } = render(<AdvancedExample />);

      getAllByTestId('trigger').forEach(trigger => {
        expect(trigger).not.toHaveAttribute('role');
      });
    });

    it('applies the correct accessibility tab index', () => {
      const { getAllByTestId } = render(<BasicExample />);

      getAllByTestId('trigger').forEach(trigger => {
        expect(trigger).toHaveAttribute('tabIndex', '0');
      });
    });

    it('does not apply the accessibility tab index when semantically implicit', () => {
      const { getAllByTestId } = render(<AdvancedExample />);

      getAllByTestId('trigger').forEach(trigger => {
        expect(trigger).not.toHaveAttribute('tabIndex');
      });
    });

    it('applies the correct accessibility expanded value when not toggled', () => {
      const { getAllByTestId } = render(<BasicExample expandedSections={[]} />);

      getAllByTestId('trigger').forEach(trigger => {
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('applies the correct accessibility expanded value when toggled', async () => {
      const { getAllByTestId } = render(<BasicExample />);
      const secondTrigger = getAllByTestId('trigger')[1];

      expect(secondTrigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(secondTrigger);

      expect(secondTrigger).toHaveAttribute('aria-expanded', 'true');
    });

    describe('onKeyDown', () => {
      it('toggles on SPACE', () => {
        const { getAllByTestId } = render(<BasicExample />);
        const secondTrigger = getAllByTestId('trigger')[1];

        fireEvent.keyDown(secondTrigger, { key: KEYS.SPACE });

        expect(secondTrigger).toHaveAttribute('aria-expanded', 'true');
      });

      it('toggles on ENTER', () => {
        const { getAllByTestId } = render(<BasicExample />);
        const secondTrigger = getAllByTestId('trigger')[1];

        fireEvent.keyDown(secondTrigger, { key: KEYS.ENTER });

        expect(secondTrigger).toHaveAttribute('aria-expanded', 'true');
      });

      it('does not toggle on DOWN', () => {
        const { getAllByTestId } = render(<BasicExample />);
        const firstTrigger = getAllByTestId('trigger')[1];

        fireEvent.keyDown(firstTrigger, { key: KEYS.DOWN });

        expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
      });
    });
  });

  describe('getPanelProps', () => {
    it('applies the correct ID', () => {
      const { getAllByTestId } = render(<BasicExample />);

      getAllByTestId('panel').forEach((panel, index) => {
        expect(panel).toHaveAttribute('id', `${CONTAINER_ID_PREFIX}--panel:${index}`);
      });
    });

    it('applies the correct accessibility ID for the associated trigger', () => {
      const { getAllByTestId } = render(<BasicExample />);
      const panels = getAllByTestId('panel');
      const triggers = getAllByTestId('trigger');

      panels.forEach((panel, index) => {
        expect(panel).toHaveAttribute('aria-labelledby', triggers[index].id);
      });
    });

    it('applies the correct accessibility role', () => {
      const { getAllByTestId } = render(<BasicExample />);

      getAllByTestId('panel').forEach(panel => {
        expect(panel).toHaveAttribute('role', 'region');
      });
    });

    it('does not apply the accessibility role when semantically implicit', () => {
      const { getAllByTestId } = render(<AdvancedExample />);

      getAllByTestId('panel').forEach(panel => {
        expect(panel).not.toHaveAttribute('role');
      });
    });

    it('applies the correct accessibility value when hidden', () => {
      const { getAllByTestId } = render(<BasicExample expandedSections={[]} />);

      getAllByTestId('panel').forEach(panel => {
        expect(panel).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('applies the correct accessibility value when not hidden', async () => {
      const { getAllByTestId } = render(<BasicExample collapsible={false} />);
      const firstTrigger = getAllByTestId('trigger')[0];
      const firstPanel = getAllByTestId('panel')[0];

      await user.click(firstTrigger);

      expect(firstPanel).toHaveAttribute('aria-hidden', 'false');
    });

    describe('onKeyDown', () => {
      it('shows on SPACE', () => {
        const { getAllByTestId } = render(<BasicExample collapsible={false} />);
        const firstTrigger = getAllByTestId('trigger')[0];
        const firstPanel = getAllByTestId('panel')[0];

        fireEvent.keyDown(firstTrigger, { key: KEYS.SPACE });

        expect(firstPanel).toHaveAttribute('aria-hidden', 'false');
      });

      it('shows on ENTER', () => {
        const { getAllByTestId } = render(<BasicExample collapsible={false} />);
        const firstTrigger = getAllByTestId('trigger')[0];
        const firstPanel = getAllByTestId('panel')[0];

        fireEvent.keyDown(firstTrigger, { key: KEYS.ENTER });

        expect(firstPanel).toHaveAttribute('aria-hidden', 'false');
      });

      it('does not show on DOWN', () => {
        const { getAllByTestId } = render(<BasicExample />);
        const firstTrigger = getAllByTestId('trigger')[1];
        const firstPanel = getAllByTestId('panel')[1];

        fireEvent.keyDown(firstTrigger, { key: KEYS.DOWN });

        expect(firstPanel).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('is not expandable (but is collapsible)', () => {
    let triggers: HTMLElement[];
    let panels: HTMLElement[];

    beforeEach(() => {
      const { getAllByTestId } = render(<BasicExample expandable={false} collapsible />);

      triggers = getAllByTestId('trigger');
      panels = getAllByTestId('panel');
    });

    it('renders with one section expanded', () => {
      panels.forEach((panel, index) => {
        const hidden = index === 0 ? 'false' : 'true';
        const expanded = index === 0 ? 'true' : 'false';

        expect(panels[index]).toHaveAttribute('aria-hidden', hidden);
        expect(triggers[index]).toHaveAttribute('aria-expanded', expanded);
      });
    });

    it('only expands one section at a time', async () => {
      // good
      await user.click(triggers[1]);
      triggers.forEach((trigger, index) => {
        const expanded = index === 1 ? 'true' : 'false';
        const hidden = index === 1 ? 'false' : 'true';

        expect(trigger).toHaveAttribute('aria-expanded', expanded);
        expect(panels[index]).toHaveAttribute('aria-hidden', hidden);
      });
    });

    it('can collapse the expanded section', async () => {
      await user.click(triggers[0]);
      triggers.forEach((trigger, index) => {
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
        expect(panels[index]).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('is not collapsible (but is expandable)', () => {
    it('renders with no disabled sections', () => {
      const { getAllByTestId } = render(<BasicExample expandedSections={[]} />);

      const triggers = getAllByTestId('trigger');
      const panels = getAllByTestId('panel');

      triggers.forEach((trigger, index) => {
        expect(trigger).not.toHaveAttribute('aria-disabled');
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
        expect(panels[index]).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('disables sections as it expands', async () => {
      const { getAllByTestId } = render(<BasicExample expandable collapsible={false} />);

      const triggers = getAllByTestId('trigger');
      const panels = getAllByTestId('panel');

      for (const trigger of triggers) {
        const index = triggers.indexOf(trigger);

        // eslint-disable-next-line no-await-in-loop
        await user.click(trigger);
        expect(trigger).toHaveAttribute('aria-disabled', 'true');
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        expect(panels[index]).toHaveAttribute('aria-hidden', 'false');
      }
    });

    it('prevents collapse on an expanded section', async () => {
      const { getAllByTestId } = render(<BasicExample expandable collapsible={false} />);

      const triggers = getAllByTestId('trigger');
      const panels = getAllByTestId('panel');

      const trigger = triggers[1];
      const panel = panels[1];

      expect(trigger).not.toHaveAttribute('aria-disabled');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(panel).toHaveAttribute('aria-hidden', 'true');
      await user.click(trigger); // expand!
      expect(trigger).toHaveAttribute('aria-disabled', 'true');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(panel).toHaveAttribute('aria-hidden', 'false');
      await user.click(trigger); // collapse?
      expect(trigger).toHaveAttribute('aria-disabled', 'true');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(panel).toHaveAttribute('aria-hidden', 'false');
    });
  });

  describe('is not expandable OR collapsible', () => {
    let triggers: HTMLElement[];
    let panels: HTMLElement[];

    beforeEach(() => {
      const { getAllByTestId } = render(<BasicExample expandable={false} collapsible={false} />);

      triggers = getAllByTestId('trigger');
      panels = getAllByTestId('panel');
    });

    it('renders with one expanded, disabled section', () => {
      triggers.forEach((trigger, index) => {
        const expanded = index === 0 ? 'true' : 'false';
        const hidden = index === 0 ? 'false' : 'true';

        expect(trigger).toHaveAttribute('aria-expanded', expanded);
        if (expanded === 'true') {
          expect(trigger).toHaveAttribute('aria-disabled', expanded);
        } else {
          expect(trigger).not.toHaveAttribute('aria-disabled');
        }
        expect(panels[index]).toHaveAttribute('aria-hidden', hidden);
      });
    });

    it('only expand-disables section at a time', async () => {
      for (const trigger of triggers) {
        const index = triggers.indexOf(trigger);

        // eslint-disable-next-line no-await-in-loop
        await user.click(trigger);
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        triggers.forEach((_trigger, _index) => {
          const expanded = _index === index ? 'true' : 'false';
          const hidden = _index === index ? 'false' : 'true';

          expect(_trigger).toHaveAttribute('aria-expanded', expanded);
          if (expanded === 'true' || index >= _index) {
            expect(trigger).toHaveAttribute('aria-disabled', 'true');
          }
          expect(panels[_index]).toHaveAttribute('aria-hidden', hidden);
        });
      }
    });

    it('prevents collapse on the expanded section', async () => {
      const trigger = triggers[0];
      const panel = panels[0];

      expect(trigger).toHaveAttribute('aria-disabled', 'true');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(panel).toHaveAttribute('aria-hidden', 'false');
      await user.click(trigger); // collapse?
      expect(trigger).toHaveAttribute('aria-disabled', 'true');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(panel).toHaveAttribute('aria-hidden', 'false');
    });
  });
});
