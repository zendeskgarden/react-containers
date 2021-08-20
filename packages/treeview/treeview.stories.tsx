/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { TreeviewContainer, useTreeview } from './src';
import styled from 'styled-components';
import { IUseTreeviewReturnValue } from './dist/typings';

const UlTreeRoot = styled.ul`
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

export const Container = ({ nodes, controlled, expandedNodes, onChange }) => {
  const EndNode = ({ name, ...props }) => (
    <li role="none">
      <a href={`https://en.wikipedia.org/wiki/${name}`} {...props}>
        {name}
      </a>
    </li>
  );

  const ParentNode = ({ name, children, ...props }) => (
    <li key={name} {...props}>
      <span>{name}</span>
      {children}
    </li>
  );

  const Group = props => <ul {...props} />;
  const Treeview = () => {
    return (
      <TreeviewContainer expandedNodes={controlled ? expandedNodes : undefined} onChange={onChange}>
        {({ getTreeProps, getTreeItemProps, getGroupProps }: IUseTreeviewReturnValue) => {
          const renderNode = (node: IFoodNode) =>
            node.children ? (
              <ParentNode
                key={node.name}
                {...getTreeItemProps({
                  index: node.name,
                  itemType: 'parent',
                  name: node.name
                })}
              >
                <Group {...getGroupProps()}>{node.children.map(renderNode)}</Group>
              </ParentNode>
            ) : (
              <EndNode
                key={node.name}
                {...getTreeItemProps({ itemType: 'end', name: node.name })}
              />
            );

          return <UlTreeRoot {...getTreeProps()}>{nodes.map(renderNode)}</UlTreeRoot>;
        }}
      </TreeviewContainer>
    );
  };

  return <Treeview />;
};

Container.storyName = 'TreeviewContainer';
Container.args = ARGS;

export const Hook = ({ nodes, controlled, expandedNodes, onChange }) => {
  const EndNode = ({ name, ...props }) => (
    <li role="none">
      <a href={`https://en.wikipedia.org/wiki/${name}`} {...props}>
        {name}
      </a>
    </li>
  );

  const ParentNode = ({ name, children, ...props }) => (
    <li key={name} {...props}>
      <span>{name}</span>
      {children}
    </li>
  );

  const Group = props => <ul {...props} />;

  const Treeview = () => {
    const { getTreeProps, getTreeItemProps, getGroupProps } = useTreeview({
      expandedNodes: controlled ? expandedNodes : undefined,
      onChange
    });

    const renderNode = (node: IFoodNode) =>
      node.children ? (
        <ParentNode
          key={node.name}
          {...getTreeItemProps({
            index: node.name,
            itemType: 'parent',
            name: node.name
          })}
        >
          <Group {...getGroupProps()}>{node.children.map(renderNode)}</Group>
        </ParentNode>
      ) : (
        <EndNode key={node.name} {...getTreeItemProps({ itemType: 'end', name: node.name })} />
      );

    return <UlTreeRoot {...getTreeProps()}>{nodes.map(renderNode)}</UlTreeRoot>;
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
    }
  }
};
