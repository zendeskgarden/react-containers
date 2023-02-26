/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef, useState } from 'react';
import { Story } from '@storybook/react';
import classNames from 'classnames';
import { composeEventHandlers } from '@zendeskgarden/container-utilities';
import {
  IComboboxContainerProps,
  IUseComboboxProps,
  IUseComboboxReturnValue,
  ComboboxContainer,
  useCombobox
} from '@zendeskgarden/container-combobox';
import { useGrid } from '@zendeskgarden/container-grid';

interface ITagsProps {
  getTagProps: IUseComboboxReturnValue['getTagProps'];
  selection: IUseComboboxReturnValue['selection'];
}

const Tags = ({ selection, getTagProps }: ITagsProps) => {
  const { getGridProps, getGridCellProps } = useGrid({
    matrix: Array.isArray(selection) ? [selection] : [[]]
  });

  return (
    <table className="inline align-top" {...getGridProps({ 'aria-label': 'Tag values' })}>
      <tbody className="inline">
        <tr className="inline">
          {Array.isArray(selection) &&
            selection.map((option, index) => {
              const tagProps = getTagProps<HTMLButtonElement>({
                option,
                'aria-label': 'Press delete or backspace to remove'
              });
              const previousDisabledOptions = selection.filter(
                (_option, _index) => _option.disabled && _index < index
              );
              const { role = undefined, ...props } = option.disabled
                ? tagProps
                : getGridCellProps<HTMLButtonElement>({
                    rowIndex: 0,
                    colIndex: index - previousDisabledOptions.length,
                    ...{ ...tagProps, role: undefined }
                  });

              return (
                <td key={index} role={role} className="inline">
                  <button className="mr-1 px-1" disabled={option.disabled} {...props} type="button">
                    {option.label || option.value}
                  </button>
                </td>
              );
            })}
        </tr>
      </tbody>
    </table>
  );
};

interface IComponentProps extends IUseComboboxReturnValue {
  layout: IArgs['layout'];
  isAutocomplete?: IUseComboboxProps['isAutocomplete'];
  isMultiselectable?: IUseComboboxProps['isMultiselectable'];
  disabled?: IUseComboboxProps['disabled'];
  hasHint?: IUseComboboxProps['hasHint'];
  hasMessage?: IUseComboboxProps['hasMessage'];
  options: IUseComboboxProps['options'];
}

const Component = ({
  layout,
  isAutocomplete,
  isMultiselectable,
  isExpanded,
  disabled,
  hasHint,
  hasMessage,
  activeValue,
  selection,
  getLabelProps,
  getHintProps,
  getTriggerProps,
  getInputProps,
  getTagProps,
  getListboxProps,
  getOptionProps,
  getMessageProps,
  options
}: IComponentProps) => {
  return (
    /* eslint-disable jsx-a11y/label-has-associated-control */
    <div className="relative">
      <label {...getLabelProps()}>Label</label>
      {hasHint && <div {...getHintProps()}>Hint</div>}
      {layout === 'Garden' && (
        <div
          className={classNames('border', 'border-solid', 'p-1', {
            'cursor-default': disabled,
            'cursor-pointer': isAutocomplete && !disabled,
            'cursor-text': !(isAutocomplete || disabled),
            'bg-grey-100': disabled,
            'border-grey-200': disabled
          })}
          {...getTriggerProps()}
        >
          {isMultiselectable && <Tags selection={selection} getTagProps={getTagProps} />}
          <input className={classNames('border-none', 'bg-transparent')} {...getInputProps()} />
          {isAutocomplete && (
            <button
              className={classNames('ml-1', 'px-1', { 'cursor-default': disabled })}
              disabled={disabled}
              tabIndex={-1}
              type="button"
            >
              &#9660;
            </button>
          )}
        </div>
      )}
      {layout === 'Downshift' && (
        <div>
          {isMultiselectable && <Tags selection={selection} getTagProps={getTagProps} />}
          <input {...getInputProps()} />
          {isAutocomplete && (
            <button
              className="ml-1 px-1"
              {...getTriggerProps({ 'aria-label': 'Options' })}
              type="button"
            >
              &#9660;
            </button>
          )}
        </div>
      )}
      {hasMessage && <div {...getMessageProps()}>Message</div>}
      <ul
        className={classNames('mt-1', 'border', 'border-solid', 'absolute', 'w-full', {
          invisible: !isExpanded
        })}
        {...getListboxProps({ 'aria-label': 'Options' })}
      >
        {options.length === 0 ? (
          <li className="text-grey-400" {...getOptionProps({ 'aria-disabled': true })}>
            No matches found
          </li>
        ) : (
          options.map((option, index) => (
            <li
              key={index}
              className={classNames('cursor-pointer', {
                'bg-blue-100': option.value === activeValue,
                'text-grey-400': option.disabled
              })}
              {...getOptionProps({ option })}
            >
              {(Array.isArray(selection)
                ? selection.find(value => value.value === option.value) !== undefined
                : selection.value === option.value) && '✓ '}
              {option.label || option.value}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

Component.displayName = 'Component';

interface IContainerProps extends IComboboxContainerProps<HTMLDivElement, HTMLUListElement> {
  layout: IArgs['layout'];
}

const Container = (props: IContainerProps) => (
  <ComboboxContainer {...props}>
    {containerProps => <Component {...props} {...containerProps} />}
  </ComboboxContainer>
);

interface IHookProps extends IUseComboboxProps<HTMLDivElement, HTMLUListElement> {
  layout: IArgs['layout'];
}

const Hook = (props: IHookProps) => {
  const hookProps = useCombobox(props);

  return <Component {...props} {...hookProps} />;
};

interface IArgs extends IComboboxContainerProps {
  as: 'hook' | 'container';
  layout: 'Garden' | 'Downshift';
}

export const ComboboxStory: Story<IArgs> = ({ as, ...props }) => {
  const triggerRef = createRef<HTMLDivElement>();
  const inputRef = createRef<HTMLInputElement>();
  const listboxRef = createRef<HTMLUListElement>();
  const [options, setOptions] = useState(props.options);
  const onChange: IUseComboboxProps['onChange'] = changes => {
    if (props.isAutocomplete && changes.inputValue !== undefined) {
      const value = changes.inputValue;

      if (value === '') {
        setOptions(props.options);
      } else {
        setOptions(
          props.options.filter(option =>
            (option.label || option.value).match(new RegExp(value.replace(/\\/gu, '\\\\'), 'gui'))
          )
        );
      }
    }
  };
  const defaultActiveIndex = props.isAutocomplete ? 0 : undefined;

  switch (as) {
    case 'container':
      return (
        <Container
          defaultActiveIndex={defaultActiveIndex}
          {...props}
          triggerRef={triggerRef}
          inputRef={inputRef}
          listboxRef={listboxRef}
          options={options}
          onChange={composeEventHandlers(onChange, props.onChange)}
        />
      );

    case 'hook':
    default:
      return (
        <Hook
          defaultActiveIndex={defaultActiveIndex}
          {...props}
          triggerRef={triggerRef}
          inputRef={inputRef}
          listboxRef={listboxRef}
          options={options}
          onChange={composeEventHandlers(onChange, props.onChange)}
        />
      );
  }
};
