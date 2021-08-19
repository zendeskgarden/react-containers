/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { TreeviewContainer, IUseTreeviewProps, useTreeview } from './src';
import styled from 'styled-components';

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
  label: 'test',
  text: 'Hello world'
};

// export const Container = ({ label, text }) => (
//   <TreeviewContainer>
//     {({ getTreeProps }: IUseTreeviewReturnValue) => (
//       <div {...getTreeProps({ label })}>{text}</div>
//     )}
//   </TreeviewContainer>
// );
//
// Container.storyName = 'TreeviewContainer';
// Container.args = ARGS;

export const Hook = () => {
  const Treeview = (props: IUseTreeviewProps) => {
    const { getTreeProps, getTreeItemProps, getGroupProps } = useTreeview(props);

    const renderNode = (node: IFoodNode) =>
      node.children ? (
        <li key={node.name} {...getTreeItemProps({ index: node.name, itemType: 'parent' })}>
          <span>{node.name}</span>
          <ul {...getGroupProps()}>{node.children.map(renderNode)}</ul>
        </li>
      ) : (
        <li key={node.name} role="none">
          <a
            {...getTreeItemProps({
              itemType: 'end',
              href: `https://en.wikipedia.org/wiki/${node.name}`
            })}
          >
            {node.name}
          </a>
        </li>
      );

    return <UlTreeRoot {...getTreeProps()}>{FOOD.map(renderNode)}</UlTreeRoot>;
  };

  return <Treeview />;
};

Hook.storyName = 'useTreeview';
Hook.args = ARGS;

Hook.parameters = {
  docs: {
    description: {
      story: `The \`useTreeview\` hook manages toggle state and required accessibility
      attributes for a group of sections.`
    }
  }
};

export default {
  component: TreeviewContainer,
  title: 'Treeview Container',
  parameters: {
    layout: 'centered',
    componentSubtitle: `A container component which wraps the useTreeview hook.`
  }
};
