# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@2.0.0...@zendeskgarden/container-tabs@2.0.1) (2023-07-21)

### Bug Fixes

- **tabs:** minimize re-rendering of container by memoization ([#554](https://github.com/zendeskgarden/react-containers/issues/554)) ([2532797](https://github.com/zendeskgarden/react-containers/commit/2532797b34a4941ff9d2ea77cad7476addd12769))

# [2.0.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@1.0.6...@zendeskgarden/container-tabs@2.0.0) (2023-06-29)

- feat(selection)!: updates container-selection to support react strict mode (#548) ([60dff5a](https://github.com/zendeskgarden/react-containers/commit/60dff5a282ad1c9c519e18641401985210b57edb)), closes [#548](https://github.com/zendeskgarden/react-containers/issues/548)

### BREAKING CHANGES

- Updated container-selection API
- Updated container-tabs API (uptakes container-selection changes)

Additional changes:

- Removes container-treeview package
- Removes container-buttongroup
- Removes container-pagination

## [1.0.6](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@1.0.5...@zendeskgarden/container-tabs@1.0.6) (2023-06-12)

### Bug Fixes

- **deps:** update non-major package dependencies ([#543](https://github.com/zendeskgarden/react-containers/issues/543)) ([08856fc](https://github.com/zendeskgarden/react-containers/commit/08856fca9b08f7434b91bf1b95b4d2fff497d75f))

## [1.0.5](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@1.0.4...@zendeskgarden/container-tabs@1.0.5) (2023-04-19)

### Bug Fixes

- **deps:** update non-major package dependencies ([#528](https://github.com/zendeskgarden/react-containers/issues/528)) ([5df36aa](https://github.com/zendeskgarden/react-containers/commit/5df36aa7c5e78dc0da79a95416e915cc8e1348da))

## [1.0.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@1.0.3...@zendeskgarden/container-tabs@1.0.4) (2023-03-17)

### Bug Fixes

- update size snapshots ([#524](https://github.com/zendeskgarden/react-containers/issues/524)) ([67c3f83](https://github.com/zendeskgarden/react-containers/commit/67c3f83a41f89ec3a6dfde986c85405b893f7b74))

## [1.0.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@1.0.2...@zendeskgarden/container-tabs@1.0.3) (2023-03-17)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [1.0.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@1.0.1...@zendeskgarden/container-tabs@1.0.2) (2023-02-17)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [1.0.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@1.0.0...@zendeskgarden/container-tabs@1.0.1) (2022-10-10)

**Note:** Version bump only for package @zendeskgarden/container-tabs

# [1.0.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.5.18...@zendeskgarden/container-tabs@1.0.0) (2022-06-17)

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

## [0.5.18](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.5.17...@zendeskgarden/container-tabs@0.5.18) (2022-04-25)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.5.17](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.5.16...@zendeskgarden/container-tabs@0.5.17) (2022-03-31)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.5.16](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.5.15...@zendeskgarden/container-tabs@0.5.16) (2022-02-28)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.5.15](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.5.14...@zendeskgarden/container-tabs@0.5.15) (2021-11-30)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.5.14](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.5.13...@zendeskgarden/container-tabs@0.5.14) (2021-11-08)

### Bug Fixes

- package lock files out of sync ([#396](https://github.com/zendeskgarden/react-containers/issues/396)) ([db47ef7](https://github.com/zendeskgarden/react-containers/commit/db47ef7e099977a015b8d545bff8be74efc027be))

## [0.5.13](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.5.12...@zendeskgarden/container-tabs@0.5.13) (2021-09-27)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.5.12](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.5.11...@zendeskgarden/container-tabs@0.5.12) (2021-09-03)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.5.11](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.5.10...@zendeskgarden/container-tabs@0.5.11) (2021-09-02)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.5.10](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.5.9...@zendeskgarden/container-tabs@0.5.10) (2021-08-16)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.5.9](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.5.8...@zendeskgarden/container-tabs@0.5.9) (2021-02-25)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.5.8](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.5.7...@zendeskgarden/container-tabs@0.5.8) (2021-01-15)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.5.7](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.5.6...@zendeskgarden/container-tabs@0.5.7) (2020-10-23)

### Bug Fixes

- **tabs:** use separate refs for separate examples ([#239](https://github.com/zendeskgarden/react-containers/issues/239)) ([1421d98](https://github.com/zendeskgarden/react-containers/commit/1421d9845b60e575056f75c29679210ef28958fb))

## [0.5.6](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.5.5...@zendeskgarden/container-tabs@0.5.6) (2020-06-10)

### Bug Fixes

- **tabs:** remove tabindex from panel ([#210](https://github.com/zendeskgarden/react-containers/issues/210)) ([01f8652](https://github.com/zendeskgarden/react-containers/commit/01f865212d62ab519ece8f253c76471203f195b2))

## [0.5.5](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.5.4...@zendeskgarden/container-tabs@0.5.5) (2020-05-14)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.5.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.5.3...@zendeskgarden/container-tabs@0.5.4) (2020-04-06)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.5.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.5.2...@zendeskgarden/container-tabs@0.5.3) (2020-03-23)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.5.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.5.1...@zendeskgarden/container-tabs@0.5.2) (2020-02-20)

### Bug Fixes

- **build:** improve bundle size with @babel/runtime ([#162](https://github.com/zendeskgarden/react-containers/issues/162)) ([506504c](https://github.com/zendeskgarden/react-containers/commit/506504c840795f34e420b016b94cef10440a30cb))

## [0.5.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.5.0...@zendeskgarden/container-tabs@0.5.1) (2020-02-14)

### Bug Fixes

- **build:** apply babel to all bundles ([#160](https://github.com/zendeskgarden/react-containers/issues/160)) ([826735b](https://github.com/zendeskgarden/react-containers/commit/826735bba881d5247b423ffb61cf9643c6599d16))

# [0.5.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.4.1...@zendeskgarden/container-tabs@0.5.0) (2020-02-12)

### Features

- **build:** introduce rollup for CJS and ES module bundles ([#158](https://github.com/zendeskgarden/react-containers/issues/158)) ([58313d4](https://github.com/zendeskgarden/react-containers/commit/58313d486e3bfa023e2c9d090149d7ec358d0cd0))

## [0.4.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.4.0...@zendeskgarden/container-tabs@0.4.1) (2020-01-22)

**Note:** Version bump only for package @zendeskgarden/container-tabs

# [0.4.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.3.6...@zendeskgarden/container-tabs@0.4.0) (2020-01-15)

### Features

- move ID utilities to react-uid ([#142](https://github.com/zendeskgarden/react-containers/issues/142)) ([9f30572](https://github.com/zendeskgarden/react-containers/commit/9f3057202c94ca497b11b6f05ef649c87d5a5716))

## [0.3.6](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.3.5...@zendeskgarden/container-tabs@0.3.6) (2019-11-13)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.3.5](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.3.4...@zendeskgarden/container-tabs@0.3.5) (2019-11-07)

### Bug Fixes

- **selection:** remove aria orientation ([#129](https://github.com/zendeskgarden/react-containers/issues/129)) ([0126d84](https://github.com/zendeskgarden/react-containers/commit/0126d84324382e1493b7339cf83cbe93f10233c0))

## [0.3.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.3.3...@zendeskgarden/container-tabs@0.3.4) (2019-11-04)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.3.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.3.2...@zendeskgarden/container-tabs@0.3.3) (2019-11-01)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.3.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.3.1...@zendeskgarden/container-tabs@0.3.2) (2019-10-22)

### Bug Fixes

- update render prop function return types ([#121](https://github.com/zendeskgarden/react-containers/issues/121)) ([eaea3fd](https://github.com/zendeskgarden/react-containers/commit/eaea3fd61a16085ef480ddbd2d67aa377738db36))

## [0.3.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.3.0...@zendeskgarden/container-tabs@0.3.1) (2019-10-16)

**Note:** Version bump only for package @zendeskgarden/container-tabs

# [0.3.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.2.7...@zendeskgarden/container-tabs@0.3.0) (2019-10-10)

### Features

- **tabs:** migrate tabs to TypeScript ([#111](https://github.com/zendeskgarden/react-containers/issues/111)) ([ebeadd3](https://github.com/zendeskgarden/react-containers/commit/ebeadd3))

## [0.2.7](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.2.6...@zendeskgarden/container-tabs@0.2.7) (2019-09-25)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.2.6](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.2.5...@zendeskgarden/container-tabs@0.2.6) (2019-09-19)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.2.5](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.2.4...@zendeskgarden/container-tabs@0.2.5) (2019-09-13)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.2.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.2.3...@zendeskgarden/container-tabs@0.2.4) (2019-09-05)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.2.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.2.2...@zendeskgarden/container-tabs@0.2.3) (2019-08-20)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.2.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.2.1...@zendeskgarden/container-tabs@0.2.2) (2019-07-25)

**Note:** Version bump only for package @zendeskgarden/container-tabs

## [0.2.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.2.0...@zendeskgarden/container-tabs@0.2.1) (2019-06-13)

**Note:** Version bump only for package @zendeskgarden/container-tabs

# [0.2.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-tabs@0.1.0...@zendeskgarden/container-tabs@0.2.0) (2019-05-29)

### Features

- **selection|tabs:** Add defaultSelectedIndex prop ([#37](https://github.com/zendeskgarden/react-containers/issues/37)) ([93f17d8](https://github.com/zendeskgarden/react-containers/commit/93f17d8))

# 0.1.0 (2019-05-14)

### Features

- **tabs:** Introduce useTabs and TabsContainer ([#31](https://github.com/zendeskgarden/react-containers/issues/31)) ([df6f949](https://github.com/zendeskgarden/react-containers/commit/df6f949))
