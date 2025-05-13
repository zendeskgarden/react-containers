# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-menu@0.5.1...@zendeskgarden/container-menu@1.0.0) (2025-05-13)

- **container-menu:** introduces `getAnchorProps` in `useMenu` to handle anchor-specific attributes more cleanly. This update separates anchor logic from `getItemProps` for better modularity. ([#695](https://github.com/zendeskgarden/react-containers/issues/695)) ([15d4e5c](https://github.com/zendeskgarden/react-containers/commit/15d4e5cd08be7ab09621db4109190a139b42dcab))

### BREAKING CHANGES

- `getItemProps` no longer includes anchor-related props. Use `getAnchorProps` specifically for `<a>` tags now.
- For `<li>` elements surrounding anchor items, keep using `getItemProps` as before.
- `useMenu` doesn't manage selected link state automatically anymore. You'll need to either:
  - Set `selected: true` on items that should be selected by default, or
  - Use `props.selectedItems` to explicitly control selection (overrides default selection).

## [0.5.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-menu@0.5.0...@zendeskgarden/container-menu@0.5.1) (2025-04-08)

### Bug Fixes

- **container-menu:** improve menu dropdown expansion and focus behavior on blur ([#691](https://github.com/zendeskgarden/react-containers/issues/691)) ([90bdb14](https://github.com/zendeskgarden/react-containers/commit/90bdb147036f340f7f00750ed56984fc814ad379))

# [0.5.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-menu@0.4.2...@zendeskgarden/container-menu@0.5.0) (2024-09-25)

### Bug Fixes

- **menu:** prevents `defaultFocusedValue` from focusing items on trigger click ([#660](https://github.com/zendeskgarden/react-containers/issues/660)) ([ec77a9d](https://github.com/zendeskgarden/react-containers/commit/ec77a9d64b8f714aeec3de18baad7d617f10c977))

- fix(container-menu)!: improves logic for returning focus to trigger (#659) ([93b6278](https://github.com/zendeskgarden/react-containers/commit/93b6278733a3255cd6bce5d6b6176aae15c3ce3b)), closes [#659](https://github.com/zendeskgarden/react-containers/issues/659)

### BREAKING CHANGES

- A new `restoreFocus` prop has been added. By default `restoreFocus` is `true` and will return the focus to the trigger on menu item selection, ESC / TAB key press, and clicking outside the menu dropdown. User who need to keep the dropdown open on selection must set `restoreFocus={false}` and manually handle the focus return.

## [0.4.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-menu@0.4.1...@zendeskgarden/container-menu@0.4.2) (2024-08-23)

### Bug Fixes

- React peer dependency ranges ([#656](https://github.com/zendeskgarden/react-containers/issues/656)) ([be95225](https://github.com/zendeskgarden/react-containers/commit/be95225f3c988183944d8b0395c578dd4396ba62))

## [0.4.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-menu@0.4.0...@zendeskgarden/container-menu@0.4.1) (2024-08-12)

**Note:** Version bump only for package @zendeskgarden/container-menu

# [0.4.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-menu@0.3.4...@zendeskgarden/container-menu@0.4.0) (2024-07-01)

### Features

- **menu:** adds support for link items ([#648](https://github.com/zendeskgarden/react-containers/issues/648)) ([cfa0aa1](https://github.com/zendeskgarden/react-containers/commit/cfa0aa1eb42033c499b1b5870de25d981a8f4104))

## [0.3.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-menu@0.3.3...@zendeskgarden/container-menu@0.3.4) (2024-07-01)

**Note:** Version bump only for package @zendeskgarden/container-menu

## [0.3.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-menu@0.3.2...@zendeskgarden/container-menu@0.3.3) (2024-01-26)

**Note:** Version bump only for package @zendeskgarden/container-menu

## [0.3.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-menu@0.3.1...@zendeskgarden/container-menu@0.3.2) (2024-01-26)

**Note:** Version bump only for package @zendeskgarden/container-menu

## [0.3.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-menu@0.3.0...@zendeskgarden/container-menu@0.3.1) (2024-01-23)

**Note:** Version bump only for package @zendeskgarden/container-menu

# [0.3.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-menu@0.2.2...@zendeskgarden/container-menu@0.3.0) (2023-10-05)

### Bug Fixes

- **menu:** prevents focus from moving out of the menu unless it is actually closed ([#605](https://github.com/zendeskgarden/react-containers/issues/605)) ([8efc805](https://github.com/zendeskgarden/react-containers/commit/8efc805b625022b74b0a3bc14d1a2aa4edcc95fe))

### Features

- **menu:** passes clicked item's value to onChange ([#604](https://github.com/zendeskgarden/react-containers/issues/604)) ([ccb8729](https://github.com/zendeskgarden/react-containers/commit/ccb87294fd004aa31c0449deaae9103dcc72507d))

## [0.2.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-menu@0.2.1...@zendeskgarden/container-menu@0.2.2) (2023-10-02)

### Bug Fixes

- **menu:** ensures most recent selected item is last in change handler selectedItems arg ([#603](https://github.com/zendeskgarden/react-containers/issues/603)) ([bbc7b40](https://github.com/zendeskgarden/react-containers/commit/bbc7b4096a5374b9f9fe0af32b50833c528baf7b))

## [0.2.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-menu@0.2.0...@zendeskgarden/container-menu@0.2.1) (2023-09-28)

### Bug Fixes

- **deps:** update non-major package dependencies ([#590](https://github.com/zendeskgarden/react-containers/issues/590)) ([80c4e81](https://github.com/zendeskgarden/react-containers/commit/80c4e8131ec657b38d3e8932aa688fcd141e8cb8))
- **menu:** removes document event listeners when menu closes + fixes trigger expansion attributes ([#602](https://github.com/zendeskgarden/react-containers/issues/602)) ([fd3906b](https://github.com/zendeskgarden/react-containers/commit/fd3906bef20a5ed88a8f6089e56d60ce0c4266a0))

# [0.2.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-menu@0.1.1...@zendeskgarden/container-menu@0.2.0) (2023-09-18)

### Features

- **menu:** enables initial selected items ([#587](https://github.com/zendeskgarden/react-containers/issues/587)) ([7dab124](https://github.com/zendeskgarden/react-containers/commit/7dab1241c08001226ee41cba0173eecbe4b81a7a))

## [0.1.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-menu@0.1.0...@zendeskgarden/container-menu@0.1.1) (2023-09-05)

### Bug Fixes

- **menu:** allow prop spread override in getItemProps ([#583](https://github.com/zendeskgarden/react-containers/issues/583)) ([e9599c8](https://github.com/zendeskgarden/react-containers/commit/e9599c8c912fe3304ed29b19563ea3a0a20dd561))

# 0.1.0 (2023-08-29)

### Features

- **menu:** new menu hook and container ([#576](https://github.com/zendeskgarden/react-containers/issues/576)) ([ed165da](https://github.com/zendeskgarden/react-containers/commit/ed165dad8c2961a1fd6f2f61e3345842e3d7cf47))
