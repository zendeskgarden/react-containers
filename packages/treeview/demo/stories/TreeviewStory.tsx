/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';
import { Story } from '@storybook/react';
import classNames from 'classnames';
import { ContainerOrientation } from '@zendeskgarden/container-utilities';
import {
  ITreeviewContainerProps,
  IUseTreeviewProps,
  IUseTreeviewReturnValue,
  TreeviewContainer,
  useTreeview
} from '@zendeskgarden/container-treeview';
import { ITreeNode } from './types';

interface INodeProps {
  treeNode: ITreeNode;
  rtl: IUseTreeviewProps<any>['rtl'];
  orientation: IUseTreeviewProps<any>['orientation'];
  getNodeProps: IUseTreeviewReturnValue<string>['getNodeProps'];
  getGroupProps: IUseTreeviewReturnValue<string>['getGroupProps'];
  level?: number;
}

const Node = ({
  treeNode,
  orientation,
  rtl,
  getNodeProps,
  getGroupProps,
  level = 1
}: INodeProps) => {
  const nodeProps = getNodeProps({
    focusRef: createRef(),
    item: treeNode.name,
    nodeType: treeNode.children ? 'parent' : 'end'
  });
  const className = treeNode.children ? 'cursor-pointer' : 'cursor-default';
  const nameClassName = classNames('px-2', 'py-1', { 'bg-blue-300': nodeProps['aria-selected'] });
  const parentClassName = classNames({
    flex: orientation === ContainerOrientation.HORIZONTAL,
    'pl-5': !rtl,
    'pr-5': rtl
  });

  return (
    <li className={className} {...nodeProps}>
      {treeNode.children ? (
        <details open={nodeProps['aria-expanded']}>
          <summary className={nameClassName}>{treeNode.name}</summary>
          <ul className={parentClassName} {...getGroupProps()}>
            {treeNode.children.map((node, index) => (
              <Node
                key={`${level}${index}`}
                treeNode={node}
                orientation={orientation}
                rtl={rtl}
                getNodeProps={getNodeProps}
                getGroupProps={getGroupProps}
                level={level + 1}
              />
            ))}
          </ul>
        </details>
      ) : (
        <div className={nameClassName}>{treeNode.name}</div>
      )}
    </li>
  );
};

interface IComponentProps extends IUseTreeviewReturnValue<string> {
  tree: ITreeNode[];
  orientation: IUseTreeviewProps<any>['orientation'];
  rtl: IUseTreeviewProps<any>['rtl'];
}

const Component = ({ getTreeProps, tree, orientation, rtl, ...props }: IComponentProps) => (
  <ul
    className={classNames('overflow-auto', 'p-1', {
      flex: orientation === ContainerOrientation.HORIZONTAL
    })}
    style={{ direction: rtl ? 'rtl' : 'ltr' }}
    {...getTreeProps()}
  >
    {tree.map((node, index) => (
      <Node key={index} treeNode={node} orientation={orientation} rtl={rtl} {...props} />
    ))}
  </ul>
);

interface IProps extends IUseTreeviewProps<string> {
  tree: ITreeNode[];
}

const Container = ({ tree, ...props }: IProps) => (
  <TreeviewContainer {...props}>
    {containerProps => (
      <Component tree={tree} orientation={props.orientation} rtl={props.rtl} {...containerProps} />
    )}
  </TreeviewContainer>
);

const Hook = ({ tree, ...props }: IProps) => {
  const hookProps = useTreeview(props);

  return <Component tree={tree} orientation={props.orientation} rtl={props.rtl} {...hookProps} />;
};

interface IArgs extends ITreeviewContainerProps<string> {
  as: 'hook' | 'container';
  tree: ITreeNode[];
}

export const TreeviewStory: Story<IArgs> = ({ as, tree, ...props }: IArgs) => {
  const Treeview = () => {
    switch (as) {
      case 'container':
        return <Container tree={tree} {...props} />;

      case 'hook':
      default:
        return <Hook tree={tree} {...props} />;
    }
  };

  return <Treeview />;
};
