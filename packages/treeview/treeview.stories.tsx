/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef, forwardRef, HTMLProps } from 'react';
import { TreeviewContainer, useTreeview } from './src';
import styled from 'styled-components';

const Tree = styled.ul`
  margin: 1em;

  li {
    margin-left: 1em;
  }

  li[role='treeitem'] {
    cursor: pointer;

    &[aria-expanded='true'] {
      list-style-type: '↓';

      & > [role='group'] {
        display: initial;
      }
    }

    &[aria-expanded='false'] {
      list-style-type: '→';

      & > [role='group'] {
        display: none;
      }
    }
  }
`;

interface IFoodNode {
  name: string;
  children?: IFoodNode[];
}

const FOOD: IFoodNode[] = [
  {
    name: 'Fruits',
    children: [
      { name: 'Oranges' },
      { name: 'Pineapple' },
      { name: 'Bananas' },
      {
        name: 'Apples',
        children: [
          { name: 'Macintosh' },
          {
            name: 'Fuji'
          }
        ]
      },
      {
        name: 'Bulb and Stem Vegetables',
        children: [
          {
            name: 'Asparagus'
          },
          {
            name: 'Celery'
          },
          {
            name: 'Leek'
          }
        ]
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
  },
  {
    name: 'Grains',
    children: [
      {
        name: 'Cereal Grains',
        children: [{ name: 'Barley' }, { name: 'Oats' }, { name: 'Rice' }]
      },
      {
        name: 'Oilseeds',
        children: [{ name: 'Safflower' }, { name: 'Flax' }, { name: 'Poppy' }]
      }
    ]
  }
];

const ARGS = {
  controlled: true,
  expandedNodes: ['Grains'],
  nodes: FOOD
};

interface INodeProps extends HTMLProps<any> {
  name?: any;
  children?: React.ReactNode;
}

export const Container = ({ nodes, controlled, expandedNodes, onChange, onClick }) => {
  const EndNode = forwardRef<HTMLLIElement>(({ name, ...props }: INodeProps, ref) => (
    <li ref={ref} role="none">
      <a href={`https://en.wikipedia.org/wiki/${name}`} {...props}>
        {name}
      </a>
    </li>
  ));

  EndNode.displayName = 'EndNode';

  const ParentNode = forwardRef<HTMLLIElement>(({ name, children, ...props }: INodeProps, ref) => (
    <li ref={ref} {...props}>
      <span>{name}</span>
      {children}
    </li>
  ));

  ParentNode.displayName = 'ParentNode';

  const Group = props => <ul {...props} />;
  const Treeview = () => {
    const tabRefs = [];

    return (
      <TreeviewContainer openNodes={controlled ? expandedNodes : undefined} onChange={onChange}>
        {({ getTreeProps, getTreeItemProps, getGroupProps }) => {
          const renderNode = (node: IFoodNode) => {
            const newRef = createRef();

            tabRefs.push(newRef);

            return node.children ? (
              <ParentNode
                key={node.name}
                {...getTreeItemProps({
                  nodeType: 'parent',
                  index: node.name,
                  item: node.name,
                  focusRef: newRef,
                  name: node.name,
                  onClick
                })}
              >
                <Group {...getGroupProps()}>{node.children.map(renderNode)}</Group>
              </ParentNode>
            ) : (
              <EndNode
                key={node.name}
                {...getTreeItemProps({
                  nodeType: 'end',
                  item: node.name,
                  focusRef: newRef,
                  name: node.name,
                  onClick
                })}
              />
            );
          };

          return <Tree {...getTreeProps()}>{nodes.map(renderNode)}</Tree>;
        }}
      </TreeviewContainer>
    );
  };

  return <Treeview />;
};

Container.storyName = 'TreeviewContainer';
Container.args = ARGS;

export const Hook = ({ nodes, controlled, expandedNodes, onChange, onClick }) => {
  const EndNode = forwardRef<HTMLLIElement>(({ name, ...props }: INodeProps, ref) => (
    <li ref={ref} role="none">
      <a href={`https://en.wikipedia.org/wiki/${name}`} {...props}>
        {name}
      </a>
    </li>
  ));

  EndNode.displayName = 'EndNode';

  const ParentNode = forwardRef<HTMLLIElement>(({ name, children, ...props }: INodeProps, ref) => (
    <li ref={ref} {...props}>
      <span>{name}</span>
      {children}
    </li>
  ));

  ParentNode.displayName = 'ParentNode';

  const Group = props => <ul {...props} />;

  const Treeview = () => {
    const { getTreeProps, getTreeItemProps, getGroupProps } = useTreeview<string>({
      openNodes: controlled ? expandedNodes : undefined,
      onChange
    });
    const tabRefs = [];

    const renderNode = (node: IFoodNode) => {
      const newRef = createRef();

      tabRefs.push(newRef);

      return node.children ? (
        <ParentNode
          key={node.name}
          {...getTreeItemProps({
            nodeType: 'parent',
            index: node.name,
            item: node.name,
            focusRef: newRef,
            name: node.name,
            onClick
          })}
        >
          <Group {...getGroupProps()}>{node.children.map(renderNode)}</Group>
        </ParentNode>
      ) : (
        <EndNode
          key={node.name}
          {...getTreeItemProps({
            nodeType: 'end',
            item: node.name,
            focusRef: newRef,
            name: node.name,
            onClick
          })}
        />
      );
    };

    return <Tree {...getTreeProps()}>{nodes.map(renderNode)}</Tree>;
  };

  return <Treeview />;
};

Hook.storyName = 'useTreeview';
Hook.args = ARGS;

export default {
  component: TreeviewContainer,
  title: 'Treeview Container',
  parameters: {
    layout: 'centered',
    componentSubtitle: `A container component which wraps the useTreeview hook.`
  },
  argTypes: {
    onChange: {
      action: 'change'
    },
    onClick: {
      action: 'click'
    }
  }
};