# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.5](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-treeview@1.0.4...@zendeskgarden/container-treeview@1.0.5) (2023-04-19)

### Bug Fixes

- **deps:** update non-major package dependencies ([#528](https://github.com/zendeskgarden/react-containers/issues/528)) ([5df36aa](https://github.com/zendeskgarden/react-containers/commit/5df36aa7c5e78dc0da79a95416e915cc8e1348da))

## [1.0.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-treeview@1.0.3...@zendeskgarden/container-treeview@1.0.4) (2023-03-17)

### Bug Fixes

- update size snapshots ([#524](https://github.com/zendeskgarden/react-containers/issues/524)) ([67c3f83](https://github.com/zendeskgarden/react-containers/commit/67c3f83a41f89ec3a6dfde986c85405b893f7b74))

## [1.0.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-treeview@1.0.2...@zendeskgarden/container-treeview@1.0.3) (2023-03-17)

**Note:** Version bump only for package @zendeskgarden/container-treeview

## [1.0.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-treeview@1.0.1...@zendeskgarden/container-treeview@1.0.2) (2023-02-17)

**Note:** Version bump only for package @zendeskgarden/container-treeview

## [1.0.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-treeview@1.0.0...@zendeskgarden/container-treeview@1.0.1) (2022-10-10)

**Note:** Version bump only for package @zendeskgarden/container-treeview

# [1.0.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-treeview@0.1.3...@zendeskgarden/container-treeview@1.0.0) (2022-06-17)

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

## [0.1.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-treeview@0.1.2...@zendeskgarden/container-treeview@0.1.3) (2022-04-25)

**Note:** Version bump only for package @zendeskgarden/container-treeview

## [0.1.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-treeview@0.1.1...@zendeskgarden/container-treeview@0.1.2) (2022-03-31)

### Bug Fixes

- **treeview:** finesse API and refactor storybook ([#443](https://github.com/zendeskgarden/react-containers/issues/443)) ([b2c8d23](https://github.com/zendeskgarden/react-containers/commit/b2c8d235f3bfcf3ef89ce395f7eeefcc8fbdbad8))

## [0.1.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-treeview@0.1.0...@zendeskgarden/container-treeview@0.1.1) (2022-02-28)

**Note:** Version bump only for package @zendeskgarden/container-treeview

# 0.1.0 (2022-01-26)

### Bug Fixes

- **treeview:** update yarn.lock ([#416](https://github.com/zendeskgarden/react-containers/issues/416)) ([070b08c](https://github.com/zendeskgarden/react-containers/commit/070b08c00818238ff5a5252d0aa6d1404f463291))

### Features

- **treeview:** add treeview container ([#346](https://github.com/zendeskgarden/react-containers/issues/346)) ([d4077cd](https://github.com/zendeskgarden/react-containers/commit/d4077cd0e7004caebe20677b91753787ef6adb64))
