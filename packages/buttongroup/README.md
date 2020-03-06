# @zendeskgarden/container-buttongroup [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-buttongroup
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-buttongroup

This package includes containers relating to button groups in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-buttongroup
```

## Usage

For live examples check out our [storybook](https://zendeskgarden.github.io/react-containers?path=/story/buttongroup-container--buttongroupcontainer).

### useButtonGroup

The `useButtonGroup` hook manages focus, selection and accessibility attributes
required for a group of buttons. Garden uses this in react-components for the buttons package.

```jsx static
import { useButtonGroup } from '@zendeskgarden/container-buttongroup';

const ButtonGroup = () => {
  const [controlledSelectedItem, setSelectedItem] = useState();
  const { selectedItem, focusedItem, getButtonProps, getGroupProps } = useButtonGroup({
    selectedItem: controlledSelectedItem,
    onSelect: newSelectedItem => setSelectedItem(newSelectedItem)
  });

  return (
    <div {...getGroupProps()}>
      {buttons.map((button, index) => (
        <button
          {...getButtonProps({
            key: button,
            item: button,
            focusRef: buttonRefs[index],
            ref: buttonRefs[index],
            style: {
              boxShadow: button === focusedItem && 'inset 0 0 0 3px rgba(31,115,183, 0.35)',
              outline: 'none',
              color: button === selectedItem ? '#fff' : '#1f73b7',
              background: button === selectedItem && '#144a75',
              padding: '10px'
            }
          })}
        >
          {button}
        </button>
      ))}
    </div>
  );
};
```

### ExampleContainer

`ButtonGroupContainer` is a render-prop wrapper for the `useButtonGroup` hook.

```jsx static
import { ButtonGroupContainer } from '@zendeskgarden/container-buttongroup';

<ButtonGroupContainer>
  {({ selectedItem, focusedItem, getButtonProps, getGroupProps }) => (
    <div {...getGroupProps()}>
      {buttons.map((button, index) => (
        <button
          {...getButtonProps({
            key: button,
            item: button,
            focusRef: buttonRefs[index],
            ref: buttonRefs[index],
            style: {
              boxShadow: button === focusedItem && 'inset 0 0 0 3px rgba(31,115,183, 0.35)',
              outline: 'none',
              color: button === selectedItem ? '#fff' : '#1f73b7',
              background: button === selectedItem && '#144a75',
              padding: '10px'
            }
          })}
        >
          {button}
        </button>
      ))}
    </div>
  )}
</ButtonGroupContainer>;
```
