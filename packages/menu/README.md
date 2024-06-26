# @zendeskgarden/container-menu [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-menu
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-menu

This package includes containers relating to Menu in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-menu
```

## Usage

Check out [storybook](https://zendeskgarden.github.io/react-containers) for live examples.

### useMenu

```jsx
import { useMenu } from '@zendeskgarden/container-menu';

const Menu = () => {
  const triggerRef = useRef();
  const menuRef = useRef();
  const items = [
    { value: 'value-1', label: 'One' },
    { value: 'value-2', label: 'Two' },
    { value: 'value-3', label: 'Three' }
  ];
  const { isExpanded, getTriggerProps, getMenuProps, getItemProps, getSeparatorProps } = useMenu({
    triggerRef,
    menuRef,
    items
  });

  return (
    <>
      <button {...getTriggerProps()}>Menu</button>
      <ul {...getMenuProps()} style={{ visibility: isExpanded ? 'visible' : 'hidden' }}>
        {items.map(item => (
          <li key={item.value} {...getItemProps({ item })}>
            {item.label}
          </li>
        ))}
      </ul>
    </>
  );
};
```

### MenuContainer

```jsx
import { MenuContainer } from '@zendeskgarden/container-menu';

const Menu = () => {
  const triggerRef = useRef();
  const menuRef = useRef();
  const items = [
    { value: 'value-1', label: 'One' },
    { value: 'value-2', label: 'Two' },
    { value: 'value-3', label: 'Three', href: '#0' },
    { value: 'value-4', label: 'Four' }
  ];

  return (
    <MenuContainer triggerRef={triggerRef} menuRef={menuRef} items={items}>
      {({ isExpanded, getTriggerProps, getMenuProps, getItemProps, getSeparatorProps }) => (
        <>
          <button {...getTriggerProps()}>Menu</button>
          <ul {...getMenuProps()} style={{ visibility: isExpanded ? 'visible' : 'hidden' }}>
            {items.map(item =>
              item.href ? (
                <li key={item.value} role="none">
                  <a {...getItemProps({ item })}>{item.label}</a>
                </li>
              ) : (
                <li key={item.value} {...getItemProps({ item })}>
                  {item.label}
                </li>
              )
            )}
          </ul>
        </>
      )}
    </MenuContainer>
  );
};
```
