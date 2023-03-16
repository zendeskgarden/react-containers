# @zendeskgarden/container-combobox [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-combobox
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-combobox

This package includes containers relating to Combobox in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-combobox
```

## Features

The combobox container encapsulates complexity while supporting a wide variety of
standard features. Core logic and events are backed by Downshift. Standard
naming and behaviors are finessed to suit Garden's point of view.

- single and multiple option selection
- non-editable select-only (similar to a native HTML `<select>`)
- autocomplete (on by default) with user-provided option filtering
- support for trigger as input parent (Garden layout) vs. trigger as input
  sibling (Downshift layout)

## Usage

Check out [storybook](https://zendeskgarden.github.io/react-containers) for live examples.

### useCombobox

```jsx
import { useCombobox } from '@zendeskgarden/container-combobox';

const Combobox = () => {
  const triggerRef = createRef();
  const inputRef = createRef();
  const listboxRef = createRef();
  const options = [
    { value: 'value-1', label: 'One' },
    { value: 'value-2', label: 'Two' },
    { value: 'value-3', label: 'Three' }
  ];
  const {
    getLabelProps,
    getInputProps,
    getTriggerProps,
    getListboxProps,
    getOptionProps,
    isExpanded
  } = useCombobox({
    triggerRef,
    inputRef,
    listboxRef,
    options
  });

  return (
    <>
      <label {...getLabelProps()}>Label</label>
      <input {...getInputProps()} />
      <button {...getTriggerProps()}>&#9660;</button>
      <ul
        {...getListboxProps({ 'aria-label': 'Options' })}
        style={{ visibility: isExpanded ? 'visible' : 'hidden' }}
      >
        {options.map((option, index) => (
          <li key={index} {...getOptionProps({ option })}>
            {option.label}
          </li>
        ))}
      </ul>
    </>
  );
};
```

### ComboboxContainer

```jsx
import { ComboboxContainer } from '@zendeskgarden/container-combobox';

const Combobox = () => {
  const triggerRef = createRef();
  const inputRef = createRef();
  const listboxRef = createRef();
  const options = [
    { value: 'value-1', label: 'One' },
    { value: 'value-2', label: 'Two' },
    { value: 'value-3', label: 'Three' }
  ];

  return (
    <ComboboxContainer
      triggerRef={triggerRef}
      inputRef={inputRef}
      listboxRef={listboxRef}
      options={options}
    >
      {({
        getLabelProps,
        getInputProps,
        getTriggerProps,
        getListboxProps,
        getOptionProps,
        isExpanded
      }) => (
        <>
          <label {...getLabelProps()}>Label</label>
          <input {...getInputProps()} />
          <button {...getTriggerProps()}>&#9660;</button>
          <ul
            {...getListboxProps({ 'aria-label': 'Options' })}
            style={{ visibility: isExpanded ? 'visible' : 'hidden' }}
          >
            {options.map((option, index) => (
              <li key={index} {...getOptionProps({ option })}>
                {option.label}
              </li>
            ))}
          </ul>
        </>
      )}
    </ComboboxContainer>
  );
};
```
