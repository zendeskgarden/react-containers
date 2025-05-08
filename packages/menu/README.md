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

#### Menu items

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

#### Menu links

```jsx
import { useMenu } from '@zendeskgarden/container-menu';

const Menu = () => {
  const triggerRef = useRef();
  const menuRef = useRef();
  const items = [
    { value: 'home', label: 'Home', href="#", selected: true },
    { value: 'about', label: 'About', href="www.example.com/about" },
    { value: 'support', label: 'Support', href="www.support.example.com", external: true }
  ];
  const { isExpanded, getTriggerProps, getMenuProps, getItemProps, getAnchorProps } = useMenu({
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
            <a {...getAnchorProps({ item })}>{item.label}</a>
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
    { value: 'value-3', label: 'Three' }
  ];

  return (
    <MenuContainer triggerRef={triggerRef} menuRef={menuRef} items={items}>
      {({ isExpanded, getTriggerProps, getMenuProps, getItemProps }) => (
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
      )}
    </MenuContainer>
  );
};
```
