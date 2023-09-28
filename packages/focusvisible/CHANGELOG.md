# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@2.0.1...@zendeskgarden/container-focusvisible@2.0.2) (2023-09-28)

### Bug Fixes

- **deps:** update non-major package dependencies ([#590](https://github.com/zendeskgarden/react-containers/issues/590)) ([80c4e81](https://github.com/zendeskgarden/react-containers/commit/80c4e8131ec657b38d3e8932aa688fcd141e8cb8))

## [2.0.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@2.0.0...@zendeskgarden/container-focusvisible@2.0.1) (2023-07-28)

### Bug Fixes

- **deps:** update non-major package dependencies ([#556](https://github.com/zendeskgarden/react-containers/issues/556)) ([6831969](https://github.com/zendeskgarden/react-containers/commit/6831969ebb4390546f0159c5803121d711ef91bd))

# [2.0.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@1.0.6...@zendeskgarden/container-focusvisible@2.0.0) (2023-06-29)

- feat(selection)!: updates container-selection to support react strict mode (#548) ([60dff5a](https://github.com/zendeskgarden/react-containers/commit/60dff5a282ad1c9c519e18641401985210b57edb)), closes [#548](https://github.com/zendeskgarden/react-containers/issues/548)

### BREAKING CHANGES

- Updated container-selection API
- Updated container-tabs API (uptakes container-selection changes)

Additional changes:

- Removes container-treeview package
- Removes container-buttongroup
- Removes container-pagination

## [1.0.6](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@1.0.5...@zendeskgarden/container-focusvisible@1.0.6) (2023-06-12)

### Bug Fixes

- **deps:** update non-major package dependencies ([#543](https://github.com/zendeskgarden/react-containers/issues/543)) ([08856fc](https://github.com/zendeskgarden/react-containers/commit/08856fca9b08f7434b91bf1b95b4d2fff497d75f))

## [1.0.5](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@1.0.4...@zendeskgarden/container-focusvisible@1.0.5) (2023-04-19)

### Bug Fixes

- **deps:** update non-major package dependencies ([#528](https://github.com/zendeskgarden/react-containers/issues/528)) ([5df36aa](https://github.com/zendeskgarden/react-containers/commit/5df36aa7c5e78dc0da79a95416e915cc8e1348da))

## [1.0.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@1.0.3...@zendeskgarden/container-focusvisible@1.0.4) (2023-03-17)

### Bug Fixes

- update size snapshots ([#524](https://github.com/zendeskgarden/react-containers/issues/524)) ([67c3f83](https://github.com/zendeskgarden/react-containers/commit/67c3f83a41f89ec3a6dfde986c85405b893f7b74))

## [1.0.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@1.0.2...@zendeskgarden/container-focusvisible@1.0.3) (2023-03-17)

**Note:** Version bump only for package @zendeskgarden/container-focusvisible

## [1.0.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@1.0.1...@zendeskgarden/container-focusvisible@1.0.2) (2023-02-17)

**Note:** Version bump only for package @zendeskgarden/container-focusvisible

## [1.0.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@1.0.0...@zendeskgarden/container-focusvisible@1.0.1) (2022-10-10)

**Note:** Version bump only for package @zendeskgarden/container-focusvisible

# [1.0.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@0.4.10...@zendeskgarden/container-focusvisible@1.0.0) (2022-06-17)

- fix!(breadcrumb,modal,pagination,selection,tabs,treeview): refactored interface types for enhanced accessibility (#461) ([93f7b43](https://github.com/zendeskgarden/react-containers/commit/93f7b43485d22f2e88bc604c528849ef0b7bb556)), closes [#461](https://github.com/zendeskgarden/react-containers/issues/461)

### BREAKING CHANGES

- - breadcrumb – `[options.getContainerProps]` requires `aria-label`

* modal – `[options.getCloseProps]` requires `aria-label`
* modal – rename `id` prop to `idPrefix` for consistency
* pagination – remove `IGetContainerProps` and `IGetPageProps` exports
* pagination – `[options.getPageProps]`, `[options.getPreviousPageProps]`, and `[options.getNextPageProps]` require `aria-label`
* pagination – `[options.getPageProps]` no longer accepts `page` or `current` props (previously used to format the `aria-label` which is now required from the consumer)
* selection – rename `UseSelectionReturnValue` -> `IUseSelectionReturnValue`
* selection – remove `IGetItemPropsOptions`, `IUseSelectionState`
* tabs – replace `vertical` prop with `orientation` for consistency
* treeview – `[options.getTreeProps]` requires `aria-label`
* utilities – remove `ContainerOrientation` (enum removed from treeview)

## [0.4.10](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@0.4.9...@zendeskgarden/container-focusvisible@0.4.10) (2022-03-31)

**Note:** Version bump only for package @zendeskgarden/container-focusvisible

## [0.4.9](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@0.4.8...@zendeskgarden/container-focusvisible@0.4.9) (2021-11-08)

### Bug Fixes

- package lock files out of sync ([#396](https://github.com/zendeskgarden/react-containers/issues/396)) ([db47ef7](https://github.com/zendeskgarden/react-containers/commit/db47ef7e099977a015b8d545bff8be74efc027be))

## [0.4.8](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@0.4.7...@zendeskgarden/container-focusvisible@0.4.8) (2021-08-16)

**Note:** Version bump only for package @zendeskgarden/container-focusvisible

## [0.4.7](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@0.4.6...@zendeskgarden/container-focusvisible@0.4.7) (2021-02-25)

**Note:** Version bump only for package @zendeskgarden/container-focusvisible

## [0.4.6](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@0.4.5...@zendeskgarden/container-focusvisible@0.4.6) (2021-01-15)

**Note:** Version bump only for package @zendeskgarden/container-focusvisible

## [0.4.5](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@0.4.4...@zendeskgarden/container-focusvisible@0.4.5) (2020-10-23)

**Note:** Version bump only for package @zendeskgarden/container-focusvisible

## [0.4.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@0.4.3...@zendeskgarden/container-focusvisible@0.4.4) (2020-06-10)

**Note:** Version bump only for package @zendeskgarden/container-focusvisible

## [0.4.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@0.4.2...@zendeskgarden/container-focusvisible@0.4.3) (2020-03-02)

### Bug Fixes

- **focusvisible:** allow server side rendering ([#163](https://github.com/zendeskgarden/react-containers/issues/163)) ([ae46f6f](https://github.com/zendeskgarden/react-containers/commit/ae46f6f3ddfbd601b209d7ec6d0e8a7a481fea46))

## [0.4.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@0.4.1...@zendeskgarden/container-focusvisible@0.4.2) (2020-02-20)

### Bug Fixes

- **build:** improve bundle size with @babel/runtime ([#162](https://github.com/zendeskgarden/react-containers/issues/162)) ([506504c](https://github.com/zendeskgarden/react-containers/commit/506504c840795f34e420b016b94cef10440a30cb))

## [0.4.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@0.4.0...@zendeskgarden/container-focusvisible@0.4.1) (2020-02-14)

### Bug Fixes

- **build:** apply babel to all bundles ([#160](https://github.com/zendeskgarden/react-containers/issues/160)) ([826735b](https://github.com/zendeskgarden/react-containers/commit/826735bba881d5247b423ffb61cf9643c6599d16))

# [0.4.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@0.3.0...@zendeskgarden/container-focusvisible@0.4.0) (2020-02-12)

### Features

- **build:** introduce rollup for CJS and ES module bundles ([#158](https://github.com/zendeskgarden/react-containers/issues/158)) ([58313d4](https://github.com/zendeskgarden/react-containers/commit/58313d486e3bfa023e2c9d090149d7ec358d0cd0))

# [0.3.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@0.2.1...@zendeskgarden/container-focusvisible@0.3.0) (2019-11-14)

### Features

- **focusvisible:** migrate focusvisible to TypeScript ([#137](https://github.com/zendeskgarden/react-containers/issues/137)) ([335357a](https://github.com/zendeskgarden/react-containers/commit/335357aebca08c43841f82d8d87a7a329fcb13ad))

## [0.2.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@0.2.0...@zendeskgarden/container-focusvisible@0.2.1) (2019-11-12)

### Bug Fixes

- **focusvisible:** invalid import in README example code ([#120](https://github.com/zendeskgarden/react-containers/issues/120)) ([1bfd33b](https://github.com/zendeskgarden/react-containers/commit/1bfd33bc9271317462aef8a4ba5574aa8522a083))

# [0.2.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusvisible@0.1.0...@zendeskgarden/container-focusvisible@0.2.0) (2019-09-19)

### Features

- **utilities:** migrate container-utilities to TypeScript ([#103](https://github.com/zendeskgarden/react-containers/issues/103)) ([16583f4](https://github.com/zendeskgarden/react-containers/commit/16583f4))

# 0.1.0 (2019-08-09)

### Features

- **focusvisible:** introduce useFocusVisible hook and container ([#84](https://github.com/zendeskgarden/react-containers/issues/84)) ([61e66b9](https://github.com/zendeskgarden/react-containers/commit/61e66b9))
