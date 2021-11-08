/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef, forwardRef, HTMLProps } from 'react';
import { TreeviewContainer, useTreeview } from './src';
import styled, { css, DefaultTheme } from 'styled-components';
import { ContainerOrientation } from '@zendeskgarden/container-utilities';

interface ITreeProps extends DefaultTheme {
  orientation?: ContainerOrientation;
  rtl?: boolean;
}

const directionStyles = css<ITreeProps>`
  display: flex;
  flex-direction: ${({ orientation }) =>
    orientation === ContainerOrientation.HORIZONTAL ? 'row' : 'column'};
  text-align: ${({ rtl }) => (rtl ? 'right' : 'left')};
`;

const Tree = styled.ul<ITreeProps>`
  margin: 1em;

  ${directionStyles};

  *:focus {
    outline: 2px blue solid;
  }

  li[role='treeitem'],
  ul[role='group'] {
    ${directionStyles};
  }

  li {
    margin-left: 1em;
  }

  a[role='treeitem']:focus {
    outline: 2px red solid;
  }

  li[role='treeitem'] {
    cursor: pointer;

    &[aria-selected='true'] > span {
      font-weight: bold;
    }

    &:focus {
      outline: none;
    }

    &:focus > span {
      outline: 2px red solid;
    }

    &[aria-expanded='true'] span::before {
      content: '↓';
    }

    &[aria-expanded='false'] span::before {
      content: '→';
    }

    &[aria-expanded='true'] > [role='group'] {
      display: initial;
    }

    &[aria-expanded='false'] > [role='group'] {
      display: none;
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
  controlled: false,
  orientation: ContainerOrientation.HORIZONTAL,
  rtl: false,
  openNodes: ['Grains'],
  nodes: FOOD
};

interface INodeProps extends HTMLProps<any> {
  name?: any;
  children?: React.ReactNode;
}

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

export const Container = ({
  nodes,
  controlled,
  orientation,
  rtl,
  openNodes,
  onChange,
  onClick
}) => {
  const Treeview = () => {
    const tabRefs = [];

    return (
      <TreeviewContainer
        openNodes={controlled ? openNodes : undefined}
        orientation={orientation}
        rtl={rtl}
        onChange={onChange}
      >
        {({ getTreeProps, getNodeProps, getGroupProps }) => {
          const renderNode = (node: IFoodNode) => {
            const newRef = createRef();

            tabRefs.push(newRef);

            return node.children ? (
              <ParentNode
                key={node.name}
                {...getNodeProps({
                  nodeType: 'parent',
                  index: node.name,
                  item: node.name,
                  ref: newRef,
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
                {...getNodeProps({
                  nodeType: 'end',
                  item: node.name,
                  ref: newRef,
                  focusRef: newRef,
                  name: node.name,
                  onClick
                })}
              />
            );
          };

          return (
            <Tree orientation={orientation} {...getTreeProps()}>
              {nodes.map(renderNode)}
            </Tree>
          );
        }}
      </TreeviewContainer>
    );
  };

  return <Treeview />;
};

Container.storyName = 'TreeviewContainer';
Container.args = ARGS;

export const Hook = ({ nodes, controlled, orientation, rtl, openNodes, onChange, onClick }) => {
  const Treeview = () => {
    const { getTreeProps, getNodeProps, getGroupProps } = useTreeview<string>({
      openNodes: controlled ? openNodes : undefined,
      orientation,
      rtl,
      onChange
    });
    const tabRefs = [];

    const renderNode = (node: IFoodNode) => {
      const newRef = createRef();

      tabRefs.push(newRef);

      return node.children ? (
        <ParentNode
          key={node.name}
          {...getNodeProps({
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
          {...getNodeProps({
            nodeType: 'end',
            item: node.name,
            focusRef: newRef,
            name: node.name,
            onClick
          })}
        />
      );
    };

    return (
      <Tree orientation={orientation} {...getTreeProps()}>
        {nodes.map(renderNode)}
      </Tree>
    );
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
