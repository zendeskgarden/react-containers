/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TreeviewContainer } from './TreeviewContainer';
import { IUseTreeviewProps, IUseTreeviewReturnValue } from './types';

interface IFoodNode {
  name: string;
  children?: IFoodNode[];
}

const TEST_DATA: IFoodNode[] = [
  {
    name: 'Fruits',
    children: [
      { name: 'Oranges' },
      {
        name: 'Apples',
        children: [{ name: 'Macintosh' }, { name: 'Fuji' }]
      }
    ]
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Podded Vegetables',
        children: [{ name: 'Lentil' }, { name: 'Pea' }, { name: 'Peanut' }]
      },
      {
        name: 'Bulb and Stem Vegetables',
        children: [{ name: 'Asparagus' }, { name: 'Celery' }, { name: 'Leek' }]
      }
    ]
  }
];

const Group = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLUListElement> &
    React.HTMLAttributes<HTMLUListElement>
) => <ul data-test-id="treeview-parent-group" {...props} />;

interface IContainerTestResult {
  onChangeMock: jest.Mock;
  onFocusMock: jest.Mock;
  onClickMock: jest.Mock;
  result: RenderResult;
}

const renderTestCase = ({
  data = TEST_DATA,
  openNodes,
  orientation,
  rtl
}: {
  data?: IFoodNode[];
  openNodes?: string[];
  orientation?: IUseTreeviewProps<any>['orientation'];
  rtl?: boolean;
} = {}): IContainerTestResult => {
  const onChangeMock = jest.fn();
  const onFocusMock = jest.fn();
  const onClickMock = jest.fn();

  const renderResult = render(
    <TreeviewContainer
      onChange={onChangeMock}
      openNodes={openNodes}
      orientation={orientation}
      rtl={rtl}
    >
      {({ getTreeProps, getNodeProps, getGroupProps }: IUseTreeviewReturnValue<string>) => {
        const renderNode = (node: IFoodNode) =>
          node.children ? (
            <li
              key={node.name}
              data-test-id={node.name}
              {...getNodeProps({
                nodeType: 'parent',
                item: node.name,
                focusRef: createRef(),
                onFocus: onFocusMock,
                onClick: () => {
                  onClickMock(node.name);
                }
              })}
            >
              <span>{node.name}</span>
              <Group {...getGroupProps()}>{node.children.map(renderNode)}</Group>
            </li>
          ) : (
            <li role="none" key={node.name}>
              <a
                data-test-id={node.name}
                href={`https://en.wikipedia.org/wiki/${node.name}`}
                {...getNodeProps({
                  nodeType: 'end',
                  item: node.name,
                  focusRef: createRef(),
                  onFocus: onFocusMock,
                  onClick: e => {
                    onClickMock(node.name);
                    e.stopPropagation();
                  }
                })}
              >
                {node.name}
              </a>
            </li>
          );

        return (
          <ul data-test-id="treeview-tree" {...getTreeProps({ 'aria-label': 'test' })}>
            {data.map(renderNode)}
          </ul>
        );
      }}
    </TreeviewContainer>
  );

  return {
    result: renderResult,
    onChangeMock,
    onFocusMock,
    onClickMock
  };
};

const getParentNode = screen.getByTestId;
const getEndNode = getParentNode;

describe('TreeView', () => {
  describe('shared behaviour', () => {
    it('should call onClick when a parent item is clicked', () => {
      const { onClickMock } = renderTestCase();

      getParentNode('Fruits').click();
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it('should call onClick when an end item is clicked', () => {
      const { onClickMock } = renderTestCase();

      getEndNode('Leek').click();
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it('should call onChange with the new value on focus', () => {
      const { onFocusMock } = renderTestCase();

      userEvent.tab();
      expect(onFocusMock).toHaveBeenCalledTimes(1);
    });
  });
});

describe('uncontrolled usages', () => {
  it('should focus on the first element by default', () => {
    renderTestCase();
    userEvent.tab();
    expect(getParentNode('Fruits')).toHaveFocus();
  });

  it('should not select the first element by default', () => {
    renderTestCase();
    userEvent.tab();
    expect(getParentNode('Fruits')).toHaveAttribute('aria-selected', 'false');
  });

  it('should change selection and expanded states using keyboard and pointer', () => {
    renderTestCase();

    userEvent.tab();
    expect(getParentNode('Fruits')).toHaveAttribute('aria-selected', 'false');

    userEvent.keyboard('{space}');
    expect(getParentNode('Fruits')).toHaveAttribute('aria-selected', 'true');
    expect(getParentNode('Fruits')).toHaveAttribute('aria-expanded', 'false');
    userEvent.keyboard('{enter}');
    expect(getParentNode('Fruits')).toHaveAttribute('aria-expanded', 'true');

    userEvent.keyboard('{end}');
    userEvent.keyboard('{space}');
    expect(getParentNode('Fruits')).toHaveAttribute('aria-selected', 'false');
    expect(getParentNode('Vegetables')).toHaveAttribute('aria-expanded', 'false');
    userEvent.keyboard('{enter}');
    expect(getParentNode('Vegetables')).toHaveAttribute('aria-expanded', 'true');

    userEvent.keyboard('{home}');
    userEvent.keyboard('{space}');
    expect(getParentNode('Fruits')).toHaveAttribute('aria-selected', 'true');
    userEvent.click(getParentNode('Apples'));
    expect(getParentNode('Fruits')).toHaveAttribute('aria-expanded', 'true');
  });

  it.each`
    orientation     | rtl      | up                | down              | right             | left
    ${'vertical'}   | ${false} | ${'{arrowup}'}    | ${'{arrowdown}'}  | ${'{arrowright}'} | ${'{arrowleft}'}
    ${'vertical'}   | ${true}  | ${'{arrowup}'}    | ${'{arrowdown}'}  | ${'{arrowleft}'}  | ${'{arrowright}'}
    ${'horizontal'} | ${false} | ${'{arrowleft}'}  | ${'{arrowright}'} | ${'{arrowdown}'}  | ${'{arrowup}'}
    ${'horizontal'} | ${true}  | ${'{arrowright}'} | ${'{arrowleft}'}  | ${'{arrowdown}'}  | ${'{arrowup}'}
  `(
    'should change focus using arrow keys with orientation:$orientation and rtl:$rtl. Keybinding=> up:$up, down:$down, right:$right, left:$left',
    ({ orientation, rtl, up, down, right, left }) => {
      renderTestCase({ orientation, rtl });

      userEvent.tab();
      expect(getParentNode('Fruits')).toHaveAttribute('aria-selected', 'false');

      userEvent.keyboard(right);
      expect(getParentNode('Fruits')).toHaveAttribute('aria-expanded', 'true');

      userEvent.keyboard(right);
      userEvent.keyboard('{space}');
      expect(getParentNode('Oranges')).toHaveAttribute('aria-selected', 'true');
      userEvent.keyboard(down);
      userEvent.keyboard('{space}');
      expect(getParentNode('Apples')).toHaveAttribute('aria-selected', 'true');
      userEvent.keyboard(right);
      userEvent.keyboard('{space}');
      expect(getParentNode('Apples')).toHaveAttribute('aria-expanded', 'true');

      userEvent.keyboard(down);
      userEvent.keyboard(down);
      userEvent.keyboard(down);
      userEvent.keyboard('{space}');
      expect(getParentNode('Vegetables')).toHaveAttribute('aria-selected', 'true');

      userEvent.keyboard(right);
      userEvent.keyboard('{space}');
      expect(getParentNode('Vegetables')).toHaveAttribute('aria-expanded', 'true');

      userEvent.keyboard(right);
      userEvent.keyboard(right);
      userEvent.keyboard('{space}');
      expect(getParentNode('Podded Vegetables')).toHaveAttribute('aria-selected', 'true');
      expect(getParentNode('Podded Vegetables')).toHaveAttribute('aria-expanded', 'true');

      userEvent.keyboard(right);
      userEvent.keyboard('{space}');
      expect(getParentNode('Lentil')).toHaveAttribute('aria-selected', 'true');

      userEvent.keyboard(left);
      userEvent.keyboard(left);
      expect(getParentNode('Podded Vegetables')).toHaveAttribute('aria-expanded', 'false');

      userEvent.keyboard(left);
      userEvent.keyboard(left);
      userEvent.keyboard('{space}');
      expect(getParentNode('Vegetables')).toHaveAttribute('aria-expanded', 'false');
      expect(getParentNode('Vegetables')).toHaveAttribute('aria-selected', 'true');

      userEvent.keyboard(up);
      userEvent.keyboard(up);
      userEvent.keyboard('{space}');
      expect(getParentNode('Macintosh')).toHaveAttribute('aria-selected', 'true');
    }
  );
});

describe('controlled usage', () => {
  it('should have the given nodes opened by default', () => {
    renderTestCase({ openNodes: ['Fruits', 'Apples'] });

    expect(getParentNode('Fruits')).toHaveAttribute('aria-expanded', 'true');
    expect(getParentNode('Apples')).toHaveAttribute('aria-expanded', 'true');
  });

  it('should call onChange with a list of opened nodes including the initial nodes and the new one', () => {
    const { onChangeMock } = renderTestCase({ openNodes: ['Fruits', 'Apples'] });

    userEvent.click(getParentNode('Vegetables'));
    expect(onChangeMock).toHaveBeenCalledWith(['Fruits', 'Apples', 'Vegetables']);
  });

  it('should call onChange with a list of opened nodes without Apples', () => {
    const { onChangeMock } = renderTestCase({ openNodes: ['Fruits', 'Apples'] });

    userEvent.click(getParentNode('Apples'));
    expect(onChangeMock).toHaveBeenCalledWith(['Fruits']);
  });
});
