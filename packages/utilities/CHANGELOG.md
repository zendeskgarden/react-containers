# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.9](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@1.0.8...@zendeskgarden/container-utilities@1.0.9) (2023-08-23)

### Bug Fixes

- **utilities:** update `useId` to handle SSR ([#578](https://github.com/zendeskgarden/react-containers/issues/578)) ([d1a2f7c](https://github.com/zendeskgarden/react-containers/commit/d1a2f7c264c88ab7b60635c195b02df213942ea6))

## [1.0.8](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@1.0.7...@zendeskgarden/container-utilities@1.0.8) (2023-07-28)

### Bug Fixes

- **deps:** update non-major package dependencies ([#556](https://github.com/zendeskgarden/react-containers/issues/556)) ([6831969](https://github.com/zendeskgarden/react-containers/commit/6831969ebb4390546f0159c5803121d711ef91bd))

## [1.0.7](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@1.0.6...@zendeskgarden/container-utilities@1.0.7) (2023-07-21)

### Bug Fixes

- remove unused prop-type peerDep from container-utilities ([#555](https://github.com/zendeskgarden/react-containers/issues/555)) ([be2f04a](https://github.com/zendeskgarden/react-containers/commit/be2f04a2949df2f97027b88db45214cc6584b8fc))

## [1.0.6](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@1.0.5...@zendeskgarden/container-utilities@1.0.6) (2023-06-12)

### Bug Fixes

- **deps:** update non-major package dependencies ([#543](https://github.com/zendeskgarden/react-containers/issues/543)) ([08856fc](https://github.com/zendeskgarden/react-containers/commit/08856fca9b08f7434b91bf1b95b4d2fff497d75f))

## [1.0.5](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@1.0.4...@zendeskgarden/container-utilities@1.0.5) (2023-04-19)

### Bug Fixes

- **deps:** update non-major package dependencies ([#528](https://github.com/zendeskgarden/react-containers/issues/528)) ([5df36aa](https://github.com/zendeskgarden/react-containers/commit/5df36aa7c5e78dc0da79a95416e915cc8e1348da))

## [1.0.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@1.0.3...@zendeskgarden/container-utilities@1.0.4) (2023-03-17)

### Bug Fixes

- update size snapshots ([#524](https://github.com/zendeskgarden/react-containers/issues/524)) ([67c3f83](https://github.com/zendeskgarden/react-containers/commit/67c3f83a41f89ec3a6dfde986c85405b893f7b74))

## [1.0.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@1.0.2...@zendeskgarden/container-utilities@1.0.3) (2023-03-17)

**Note:** Version bump only for package @zendeskgarden/container-utilities

## [1.0.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@1.0.1...@zendeskgarden/container-utilities@1.0.2) (2023-02-17)

### Bug Fixes

- **deps:** update dependency @reach/auto-id to ^0.18.0 ([#494](https://github.com/zendeskgarden/react-containers/issues/494)) ([073042b](https://github.com/zendeskgarden/react-containers/commit/073042b05d01ffb9ced7a98b4b5649e00211b372))

## [1.0.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@1.0.0...@zendeskgarden/container-utilities@1.0.1) (2022-10-10)

**Note:** Version bump only for package @zendeskgarden/container-utilities

# [1.0.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@0.7.1...@zendeskgarden/container-utilities@1.0.0) (2022-06-17)

- fix!(breadcrumb,modal,pagination,selection,tabs,treeview): refactored interface types for enhanced accessibility (#461) ([93f7b43](https://github.com/zendeskgarden/react-containers/commit/93f7b43485d22f2e88bc604c528849ef0b7bb556)), closes [#461](https://github.com/zendeskgarden/react-containers/issues/461)

### Bug Fixes

- **deps:** update non-major package dependencies ([#450](https://github.com/zendeskgarden/react-containers/issues/450)) ([677e7e0](https://github.com/zendeskgarden/react-containers/commit/677e7e02022da4c7c2acf8afc39020664cdcd0b9))

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

## [0.7.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@0.7.0...@zendeskgarden/container-utilities@0.7.1) (2022-02-28)

**Note:** Version bump only for package @zendeskgarden/container-utilities

# [0.7.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@0.6.3...@zendeskgarden/container-utilities@0.7.0) (2021-11-30)

### Features

- **utilities:** add DocumentPosition, ContainerOrientation, and KEYS ([#398](https://github.com/zendeskgarden/react-containers/issues/398)) ([f778c49](https://github.com/zendeskgarden/react-containers/commit/f778c49967f9437976e5846ff0296b594a1fe465))

## [0.6.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@0.6.2...@zendeskgarden/container-utilities@0.6.3) (2021-11-08)

### Bug Fixes

- package lock files out of sync ([#396](https://github.com/zendeskgarden/react-containers/issues/396)) ([db47ef7](https://github.com/zendeskgarden/react-containers/commit/db47ef7e099977a015b8d545bff8be74efc027be))

## [0.6.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@0.6.1...@zendeskgarden/container-utilities@0.6.2) (2021-09-27)

**Note:** Version bump only for package @zendeskgarden/container-utilities

## [0.6.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@0.6.0...@zendeskgarden/container-utilities@0.6.1) (2021-09-03)

**Note:** Version bump only for package @zendeskgarden/container-utilities

# [0.6.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@0.5.6...@zendeskgarden/container-utilities@0.6.0) (2021-09-02)

### Features

- **utilities:** add utilities ([#371](https://github.com/zendeskgarden/react-containers/issues/371)) ([d612972](https://github.com/zendeskgarden/react-containers/commit/d6129720a289c29938e560a2a739001ba7d6bda1))

## [0.5.6](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@0.5.5...@zendeskgarden/container-utilities@0.5.6) (2021-08-16)

**Note:** Version bump only for package @zendeskgarden/container-utilities

## [0.5.5](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@0.5.4...@zendeskgarden/container-utilities@0.5.5) (2021-01-15)

**Note:** Version bump only for package @zendeskgarden/container-utilities

## [0.5.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@0.5.3...@zendeskgarden/container-utilities@0.5.4) (2020-06-10)

**Note:** Version bump only for package @zendeskgarden/container-utilities

## [0.5.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@0.5.2...@zendeskgarden/container-utilities@0.5.3) (2020-03-23)

### Bug Fixes

- **utils:** add typing to getControlledValue ([#173](https://github.com/zendeskgarden/react-containers/issues/173)) ([886ba5b](https://github.com/zendeskgarden/react-containers/commit/886ba5b6bd595c8946ec1fc6e5c2f8ec7e8ac3eb))

## [0.5.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@0.5.1...@zendeskgarden/container-utilities@0.5.2) (2020-02-20)

### Bug Fixes

- **build:** improve bundle size with @babel/runtime ([#162](https://github.com/zendeskgarden/react-containers/issues/162)) ([506504c](https://github.com/zendeskgarden/react-containers/commit/506504c840795f34e420b016b94cef10440a30cb))

## [0.5.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@0.5.0...@zendeskgarden/container-utilities@0.5.1) (2020-02-14)

### Bug Fixes

- **build:** apply babel to all bundles ([#160](https://github.com/zendeskgarden/react-containers/issues/160)) ([826735b](https://github.com/zendeskgarden/react-containers/commit/826735bba881d5247b423ffb61cf9643c6599d16))

# [0.5.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@0.4.0...@zendeskgarden/container-utilities@0.5.0) (2020-02-12)

### Features

- **build:** introduce rollup for CJS and ES module bundles ([#158](https://github.com/zendeskgarden/react-containers/issues/158)) ([58313d4](https://github.com/zendeskgarden/react-containers/commit/58313d486e3bfa023e2c9d090149d7ec358d0cd0))

# [0.4.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@0.3.0...@zendeskgarden/container-utilities@0.4.0) (2020-01-15)

### Features

- move ID utilities to react-uid ([#142](https://github.com/zendeskgarden/react-containers/issues/142)) ([9f30572](https://github.com/zendeskgarden/react-containers/commit/9f3057202c94ca497b11b6f05ef649c87d5a5716))

# [0.3.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@0.2.0...@zendeskgarden/container-utilities@0.3.0) (2019-09-25)

### Features

- **selection|buttongroup:** migrate useSelection and useButtonGroup to TypeScript ([#105](https://github.com/zendeskgarden/react-containers/issues/105)) ([ae86a2d](https://github.com/zendeskgarden/react-containers/commit/ae86a2d))

# [0.2.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@0.1.2...@zendeskgarden/container-utilities@0.2.0) (2019-09-19)

### Features

- **utilities:** migrate container-utilities to TypeScript ([#103](https://github.com/zendeskgarden/react-containers/issues/103)) ([16583f4](https://github.com/zendeskgarden/react-containers/commit/16583f4))

## [0.1.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@0.1.1...@zendeskgarden/container-utilities@0.1.2) (2019-09-13)

**Note:** Version bump only for package @zendeskgarden/container-utilities

## [0.1.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-utilities@0.1.0...@zendeskgarden/container-utilities@0.1.1) (2019-09-05)

**Note:** Version bump only for package @zendeskgarden/container-utilities

# 0.1.0 (2019-05-06)

### Features

- **utilities:** add new `@zendesgarden/container-utilities` package ([#30](https://github.com/zendeskgarden/react-containers/issues/30)) ([fa901cc](https://github.com/zendeskgarden/react-containers/commit/fa901cc))
