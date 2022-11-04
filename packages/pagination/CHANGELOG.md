# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@1.0.0...@zendeskgarden/container-pagination@1.0.1) (2022-10-10)

**Note:** Version bump only for package @zendeskgarden/container-pagination





# [1.0.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.3.18...@zendeskgarden/container-pagination@1.0.0) (2022-06-17)


* fix!(breadcrumb,modal,pagination,selection,tabs,treeview): refactored interface types for enhanced accessibility (#461) ([93f7b43](https://github.com/zendeskgarden/react-containers/commit/93f7b43485d22f2e88bc604c528849ef0b7bb556)), closes [#461](https://github.com/zendeskgarden/react-containers/issues/461)


### BREAKING CHANGES

* - breadcrumb – `[options.getContainerProps]` requires `aria-label`
- modal – `[options.getCloseProps]` requires `aria-label`
- modal – rename `id` prop to `idPrefix` for consistency
- pagination – remove `IGetContainerProps` and `IGetPageProps` exports
- pagination – `[options.getPageProps]`, `[options.getPreviousPageProps]`, and `[options.getNextPageProps]` require `aria-label`
- pagination – `[options.getPageProps]` no longer accepts `page` or `current` props (previously used to format the `aria-label` which is now required from the consumer)
- selection – rename `UseSelectionReturnValue` -> `IUseSelectionReturnValue`
- selection – remove `IGetItemPropsOptions`, `IUseSelectionState`
- tabs – replace `vertical` prop with `orientation` for consistency
- treeview – `[options.getTreeProps]` requires `aria-label`
- utilities – remove `ContainerOrientation` (enum removed from treeview)





## [0.3.18](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.3.17...@zendeskgarden/container-pagination@0.3.18) (2022-04-25)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.3.17](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.3.16...@zendeskgarden/container-pagination@0.3.17) (2022-03-31)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.3.16](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.3.15...@zendeskgarden/container-pagination@0.3.16) (2022-02-28)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.3.15](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.3.14...@zendeskgarden/container-pagination@0.3.15) (2021-11-30)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.3.14](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.3.13...@zendeskgarden/container-pagination@0.3.14) (2021-11-08)


### Bug Fixes

* package lock files out of sync ([#396](https://github.com/zendeskgarden/react-containers/issues/396)) ([db47ef7](https://github.com/zendeskgarden/react-containers/commit/db47ef7e099977a015b8d545bff8be74efc027be))





## [0.3.13](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.3.12...@zendeskgarden/container-pagination@0.3.13) (2021-09-27)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.3.12](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.3.11...@zendeskgarden/container-pagination@0.3.12) (2021-09-03)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.3.11](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.3.10...@zendeskgarden/container-pagination@0.3.11) (2021-09-02)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.3.10](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.3.9...@zendeskgarden/container-pagination@0.3.10) (2021-08-16)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.3.9](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.3.8...@zendeskgarden/container-pagination@0.3.9) (2021-02-25)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.3.8](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.3.7...@zendeskgarden/container-pagination@0.3.8) (2021-01-15)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.3.7](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.3.6...@zendeskgarden/container-pagination@0.3.7) (2020-10-23)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.3.6](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.3.5...@zendeskgarden/container-pagination@0.3.6) (2020-06-10)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.3.5](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.3.4...@zendeskgarden/container-pagination@0.3.5) (2020-05-14)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.3.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.3.3...@zendeskgarden/container-pagination@0.3.4) (2020-04-06)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.3.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.3.2...@zendeskgarden/container-pagination@0.3.3) (2020-03-23)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.3.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.3.1...@zendeskgarden/container-pagination@0.3.2) (2020-02-20)


### Bug Fixes

* **build:** improve bundle size with @babel/runtime ([#162](https://github.com/zendeskgarden/react-containers/issues/162)) ([506504c](https://github.com/zendeskgarden/react-containers/commit/506504c840795f34e420b016b94cef10440a30cb))





## [0.3.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.3.0...@zendeskgarden/container-pagination@0.3.1) (2020-02-14)


### Bug Fixes

* **build:** apply babel to all bundles ([#160](https://github.com/zendeskgarden/react-containers/issues/160)) ([826735b](https://github.com/zendeskgarden/react-containers/commit/826735bba881d5247b423ffb61cf9643c6599d16))





# [0.3.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.2.6...@zendeskgarden/container-pagination@0.3.0) (2020-02-12)


### Features

* **build:** introduce rollup for CJS and ES module bundles ([#158](https://github.com/zendeskgarden/react-containers/issues/158)) ([58313d4](https://github.com/zendeskgarden/react-containers/commit/58313d486e3bfa023e2c9d090149d7ec358d0cd0))





## [0.2.6](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.2.5...@zendeskgarden/container-pagination@0.2.6) (2020-01-22)


### Bug Fixes

* **pagination:** accessibility semantics ([#150](https://github.com/zendeskgarden/react-containers/issues/150)) ([13d1bd3](https://github.com/zendeskgarden/react-containers/commit/13d1bd38960bae0ce18746ab9ec7c84c0ecb4aff))





## [0.2.5](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.2.4...@zendeskgarden/container-pagination@0.2.5) (2020-01-15)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.2.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.2.3...@zendeskgarden/container-pagination@0.2.4) (2019-11-13)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.2.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.2.2...@zendeskgarden/container-pagination@0.2.3) (2019-11-07)


### Bug Fixes

* **selection:** remove aria orientation ([#129](https://github.com/zendeskgarden/react-containers/issues/129)) ([0126d84](https://github.com/zendeskgarden/react-containers/commit/0126d84324382e1493b7339cf83cbe93f10233c0))





## [0.2.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.2.1...@zendeskgarden/container-pagination@0.2.2) (2019-11-04)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.2.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.2.0...@zendeskgarden/container-pagination@0.2.1) (2019-11-01)

**Note:** Version bump only for package @zendeskgarden/container-pagination





# [0.2.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.1.15...@zendeskgarden/container-pagination@0.2.0) (2019-10-31)


### Features

* **pagination:** upgrade pagination package to TypeScript ([#122](https://github.com/zendeskgarden/react-containers/issues/122)) ([091a82e](https://github.com/zendeskgarden/react-containers/commit/091a82e022064e213ed068b831eb8b2efc27bf55))





## [0.1.15](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.1.14...@zendeskgarden/container-pagination@0.1.15) (2019-10-22)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.1.14](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.1.13...@zendeskgarden/container-pagination@0.1.14) (2019-10-20)


### Bug Fixes

* **pagination:** remove unnecessary attributes ([#119](https://github.com/zendeskgarden/react-containers/issues/119)) ([c04dd77](https://github.com/zendeskgarden/react-containers/commit/c04dd770ad95963889e1ec0808d5002485dc07b7))





## [0.1.13](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.1.12...@zendeskgarden/container-pagination@0.1.13) (2019-10-16)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.1.12](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.1.11...@zendeskgarden/container-pagination@0.1.12) (2019-09-25)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.1.11](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.1.10...@zendeskgarden/container-pagination@0.1.11) (2019-09-19)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.1.10](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.1.9...@zendeskgarden/container-pagination@0.1.10) (2019-09-13)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.1.9](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.1.8...@zendeskgarden/container-pagination@0.1.9) (2019-09-05)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.1.8](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.1.7...@zendeskgarden/container-pagination@0.1.8) (2019-08-20)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.1.7](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.1.6...@zendeskgarden/container-pagination@0.1.7) (2019-07-25)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.1.6](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.1.5...@zendeskgarden/container-pagination@0.1.6) (2019-06-13)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.1.5](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.1.4...@zendeskgarden/container-pagination@0.1.5) (2019-05-29)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.1.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.1.3...@zendeskgarden/container-pagination@0.1.4) (2019-05-14)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.1.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.1.2...@zendeskgarden/container-pagination@0.1.3) (2019-05-13)


### Bug Fixes

* **selection|buttongroup|pagination:** Pass focusRef through as ref ([#29](https://github.com/zendeskgarden/react-containers/issues/29)) ([9eb0528](https://github.com/zendeskgarden/react-containers/commit/9eb0528))





## [0.1.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.1.1...@zendeskgarden/container-pagination@0.1.2) (2019-05-07)

**Note:** Version bump only for package @zendeskgarden/container-pagination





## [0.1.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-pagination@0.1.0...@zendeskgarden/container-pagination@0.1.1) (2019-05-06)

**Note:** Version bump only for package @zendeskgarden/container-pagination





# 0.1.0 (2019-04-04)


### Features

* **pagination:** Introduce usePagination and PaginationContainer ([#20](https://github.com/zendeskgarden/react-containers/issues/20)) ([71adae1](https://github.com/zendeskgarden/react-containers/commit/71adae1))
