/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef, forwardRef, HTMLProps } from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { TreeviewContainer } from './TreeviewContainer';
import { IUseTreeviewReturnValue } from './types';

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

interface INodeProps extends HTMLProps<any> {
  name?: any;
  children?: React.ReactNode;
}

const EndNode = forwardRef<HTMLLIElement>(({ name, ...props }: INodeProps, ref) => (
  <li ref={ref} role="none">
    <a data-test-id="treeview-end" href={`https://en.wikipedia.org/wiki/${name}`} {...props}>
      {name}
    </a>
  </li>
));

EndNode.displayName = 'EndNode';

const ParentNode = forwardRef<HTMLLIElement>(({ name, children, ...props }: INodeProps, ref) => (
  <li data-test-id="treeview-parent" ref={ref} {...props}>
    <span>{name}</span>
    {children}
  </li>
));

ParentNode.displayName = 'ParentNode';

const Group = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLUListElement> &
    React.HTMLAttributes<HTMLUListElement>
) => <ul data-test-id="treeview-parent-group" {...props} />;

interface IContainerTestResult {
  onChangeMock: jest.Mock;
  onClickMock: jest.Mock;
  result: RenderResult;
}

const renderContainerTestCase = ({
  data = TEST_DATA,
  openNodes
}: {
  data?: IFoodNode[];
  openNodes?: string[];
} = {}): IContainerTestResult => {
  const onChangeMock = jest.fn();
  const onClickMock = jest.fn();
  const renderResult = render(
    <TreeviewContainer onChange={onChangeMock} openNodes={openNodes}>
      {({ getTreeProps, getTreeItemProps, getGroupProps }: IUseTreeviewReturnValue<string>) => {
        const renderNode = (node: IFoodNode) =>
          node.children ? (
            <ParentNode
              key={node.name}
              {...getTreeItemProps({
                nodeType: 'parent',
                item: node.name,
                focusRef: createRef(),
                name: node.name,
                onClick: () => {
                  onClickMock(node.name);
                }
              })}
            >
              <Group {...getGroupProps()}>{node.children.map(renderNode)}</Group>
            </ParentNode>
          ) : (
            <EndNode
              key={node.name}
              {...getTreeItemProps({
                nodeType: 'end',
                name: node.name,
                item: node.name,
                focusRef: createRef(),
                onClick: e => {
                  onClickMock(node.name);
                  e.stopPropagation();
                }
              })}
            />
          );

        return (
          <ul data-test-id="treeview-tree" {...getTreeProps()}>
            {data.map(renderNode)}
          </ul>
        );
      }}
    </TreeviewContainer>
  );

  return {
    result: renderResult,
    onChangeMock,
    onClickMock
  };
};

describe('TreeviewContainer', () => {
  describe('Tree item', () => {
    it('applies correct accessibility role', () => {
      renderContainerTestCase();
      const element = screen.getByTestId('treeview-tree');

      expect(element).toHaveAttribute('role', 'tree');
    });
  });

  describe('Parent Nodes', () => {
    it('should nave a parent node with the treeitem role and an aria-expanded and a direct children with the group role', () => {
      renderContainerTestCase();
      screen.getAllByTestId('treeview-parent').forEach(element => {
        expect(element).toHaveAttribute('role', 'treeitem');
        expect(element).toHaveAttribute('aria-expanded');

        const group = element.querySelector(':scope > [data-test-id="treeview-parent-group"]');

        expect(group).toBeInTheDocument();
      });
    });
  });

  describe('End Nodes', () => {
    it('should have end nodes with a treeitem role and no aria-expanded attribute.', () => {
      renderContainerTestCase();
      screen.getAllByTestId('treeview-end').forEach(element => {
        expect(element).toHaveAttribute('role', 'treeitem');

        expect(element).not.toHaveAttribute('aria-expanded');
      });
    });
  });

  describe('Controlled state', () => {
    let result: IContainerTestResult;

    beforeEach(() => {
      result = renderContainerTestCase({ openNodes: ['Vegetables'] });
    });

    it('should only have the vegetables node opened by default', () => {
      const vegetableSpanElement = screen.getByText('Vegetables');

      expect(screen.getByRole('treeitem', { expanded: true })).toContainElement(
        vegetableSpanElement
      );
    });

    it('onChange should be called with the new state when another node is opened', () => {
      fireEvent.click(screen.queryAllByTestId('treeview-parent')[0]);

      expect(result.onChangeMock).toHaveBeenCalledWith(['Vegetables', 'Fruits']);
    });

    it('should return an empty state when the Vegetables node is clicked on', () => {
      const vegetableSpanElement = screen.getByText('Vegetables');

      screen.getAllByRole('treeitem', { expanded: true }).forEach(e => {
        if (e.contains(vegetableSpanElement)) {
          fireEvent.click(vegetableSpanElement);
        }
      });

      expect(result.onChangeMock).toHaveBeenCalledWith([]);
    });

    it('should not open any node by itself', () => {
      fireEvent.click(screen.queryAllByTestId('treeview-parent')[0]);

      expect(screen.getAllByRole('treeitem', { expanded: true })).toHaveLength(1);
    });
  });

  describe('Mouse controls', () => {
    describe('when a parent node is clicked on', () => {
      let result: IContainerTestResult;

      beforeEach(() => {
        result = renderContainerTestCase();
        fireEvent.click(screen.queryAllByTestId('treeview-parent')[0]);
      });

      it('should have called the onChangeMock with the new expanded state', () => {
        expect(result.onChangeMock).toHaveBeenCalledWith(['Fruits']);
      });

      it('should have called the onClickMock name of the node', () => {
        expect(result.onClickMock).toHaveBeenCalledWith('Fruits');
      });

      it('should have one tree view parent with the aria-expanded property to true', () => {
        const fruitSpanElement = screen.getByText('Fruits');

        expect(screen.getByRole('treeitem', { expanded: true })).toContainElement(fruitSpanElement);
      });
    });

    describe('when an end node is clicked on', () => {
      let result: IContainerTestResult;

      beforeEach(() => {
        result = renderContainerTestCase();
        fireEvent.click(screen.queryAllByTestId('treeview-end')[0]);
      });

      it('should have called the onChangeMock with the new expanded state', () => {
        expect(result.onChangeMock).not.toHaveBeenCalled();
      });

      it('should have called the onClickMock name of the node', () => {
        expect(result.onClickMock).toHaveBeenCalledWith('Oranges');
      });
    });
  });
});
