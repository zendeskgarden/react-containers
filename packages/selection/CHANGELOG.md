# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@2.0.0...@zendeskgarden/container-selection@2.0.1) (2022-10-10)

**Note:** Version bump only for package @zendeskgarden/container-selection





# [2.0.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.3.18...@zendeskgarden/container-selection@2.0.0) (2022-06-17)


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





## [1.3.18](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.3.17...@zendeskgarden/container-selection@1.3.18) (2022-04-25)


### Bug Fixes

* **selection:** keyboard action for direction `both` + `rtl` ([#445](https://github.com/zendeskgarden/react-containers/issues/445)) ([ebeb33c](https://github.com/zendeskgarden/react-containers/commit/ebeb33c0745b4a0796929f03a8ce97d96fea87c7))





## [1.3.17](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.3.16...@zendeskgarden/container-selection@1.3.17) (2022-03-31)

**Note:** Version bump only for package @zendeskgarden/container-selection





## [1.3.16](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.3.15...@zendeskgarden/container-selection@1.3.16) (2022-02-28)

**Note:** Version bump only for package @zendeskgarden/container-selection





## [1.3.15](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.3.14...@zendeskgarden/container-selection@1.3.15) (2021-11-30)

**Note:** Version bump only for package @zendeskgarden/container-selection





## [1.3.14](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.3.13...@zendeskgarden/container-selection@1.3.14) (2021-11-08)


### Bug Fixes

* package lock files out of sync ([#396](https://github.com/zendeskgarden/react-containers/issues/396)) ([db47ef7](https://github.com/zendeskgarden/react-containers/commit/db47ef7e099977a015b8d545bff8be74efc027be))





## [1.3.13](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.3.12...@zendeskgarden/container-selection@1.3.13) (2021-09-27)

**Note:** Version bump only for package @zendeskgarden/container-selection





## [1.3.12](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.3.11...@zendeskgarden/container-selection@1.3.12) (2021-09-03)

**Note:** Version bump only for package @zendeskgarden/container-selection





## [1.3.11](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.3.10...@zendeskgarden/container-selection@1.3.11) (2021-09-02)

**Note:** Version bump only for package @zendeskgarden/container-selection





## [1.3.10](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.3.9...@zendeskgarden/container-selection@1.3.10) (2021-08-16)


### Bug Fixes

* **selection:** stop hijacking keyboard events with modifier pressed ([#341](https://github.com/zendeskgarden/react-containers/issues/341)) ([84f4aaf](https://github.com/zendeskgarden/react-containers/commit/84f4aaf75a3c2fcdc2d25c42cc715441719a4a91))





## [1.3.9](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.3.8...@zendeskgarden/container-selection@1.3.9) (2021-02-25)

**Note:** Version bump only for package @zendeskgarden/container-selection





## [1.3.8](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.3.7...@zendeskgarden/container-selection@1.3.8) (2021-01-15)

**Note:** Version bump only for package @zendeskgarden/container-selection





## [1.3.7](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.3.6...@zendeskgarden/container-selection@1.3.7) (2020-10-23)


### Bug Fixes

* **selection:** update reducer to not run side effect ([#241](https://github.com/zendeskgarden/react-containers/issues/241)) ([1107475](https://github.com/zendeskgarden/react-containers/commit/11074759f12af08b9b0a36fd3d5b52cc4a735dfb))





## [1.3.6](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.3.5...@zendeskgarden/container-selection@1.3.6) (2020-06-10)

**Note:** Version bump only for package @zendeskgarden/container-selection





## [1.3.5](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.3.4...@zendeskgarden/container-selection@1.3.5) (2020-05-14)

**Note:** Version bump only for package @zendeskgarden/container-selection





## [1.3.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.3.3...@zendeskgarden/container-selection@1.3.4) (2020-04-06)

**Note:** Version bump only for package @zendeskgarden/container-selection





## [1.3.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.3.2...@zendeskgarden/container-selection@1.3.3) (2020-03-23)

**Note:** Version bump only for package @zendeskgarden/container-selection





## [1.3.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.3.1...@zendeskgarden/container-selection@1.3.2) (2020-02-20)


### Bug Fixes

* **build:** improve bundle size with @babel/runtime ([#162](https://github.com/zendeskgarden/react-containers/issues/162)) ([506504c](https://github.com/zendeskgarden/react-containers/commit/506504c840795f34e420b016b94cef10440a30cb))





## [1.3.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.3.0...@zendeskgarden/container-selection@1.3.1) (2020-02-14)


### Bug Fixes

* **build:** apply babel to all bundles ([#160](https://github.com/zendeskgarden/react-containers/issues/160)) ([826735b](https://github.com/zendeskgarden/react-containers/commit/826735bba881d5247b423ffb61cf9643c6599d16))





# [1.3.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.2.8...@zendeskgarden/container-selection@1.3.0) (2020-02-12)


### Features

* **build:** introduce rollup for CJS and ES module bundles ([#158](https://github.com/zendeskgarden/react-containers/issues/158)) ([58313d4](https://github.com/zendeskgarden/react-containers/commit/58313d486e3bfa023e2c9d090149d7ec358d0cd0))





## [1.2.8](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.2.7...@zendeskgarden/container-selection@1.2.8) (2020-01-22)


### Bug Fixes

* **pagination:** accessibility semantics ([#150](https://github.com/zendeskgarden/react-containers/issues/150)) ([13d1bd3](https://github.com/zendeskgarden/react-containers/commit/13d1bd38960bae0ce18746ab9ec7c84c0ecb4aff))





## [1.2.7](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.2.6...@zendeskgarden/container-selection@1.2.7) (2020-01-15)

**Note:** Version bump only for package @zendeskgarden/container-selection





## [1.2.6](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.2.5...@zendeskgarden/container-selection@1.2.6) (2019-11-13)

**Note:** Version bump only for package @zendeskgarden/container-selection





## [1.2.5](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.2.4...@zendeskgarden/container-selection@1.2.5) (2019-11-07)


### Bug Fixes

* **selection:** remove aria orientation ([#129](https://github.com/zendeskgarden/react-containers/issues/129)) ([0126d84](https://github.com/zendeskgarden/react-containers/commit/0126d84324382e1493b7339cf83cbe93f10233c0))





## [1.2.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.2.3...@zendeskgarden/container-selection@1.2.4) (2019-11-04)

**Note:** Version bump only for package @zendeskgarden/container-selection





## [1.2.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.2.2...@zendeskgarden/container-selection@1.2.3) (2019-11-01)


### Bug Fixes

* **selection:** correct vertical ordering in RTL mode ([#125](https://github.com/zendeskgarden/react-containers/issues/125)) ([953ff41](https://github.com/zendeskgarden/react-containers/commit/953ff411ff6bc99a3f6a0678f1cded04e5d2eb80))





## [1.2.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.2.1...@zendeskgarden/container-selection@1.2.2) (2019-10-22)


### Bug Fixes

* update render prop function return types ([#121](https://github.com/zendeskgarden/react-containers/issues/121)) ([eaea3fd](https://github.com/zendeskgarden/react-containers/commit/eaea3fd61a16085ef480ddbd2d67aa377738db36))





## [1.2.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.2.0...@zendeskgarden/container-selection@1.2.1) (2019-10-16)

**Note:** Version bump only for package @zendeskgarden/container-selection





# [1.2.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.1.6...@zendeskgarden/container-selection@1.2.0) (2019-09-25)


### Features

* **selection|buttongroup:** migrate useSelection and useButtonGroup to TypeScript ([#105](https://github.com/zendeskgarden/react-containers/issues/105)) ([ae86a2d](https://github.com/zendeskgarden/react-containers/commit/ae86a2d))





## [1.1.6](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.1.5...@zendeskgarden/container-selection@1.1.6) (2019-09-19)

**Note:** Version bump only for package @zendeskgarden/container-selection





## [1.1.5](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.1.4...@zendeskgarden/container-selection@1.1.5) (2019-09-13)


### Bug Fixes

* **selection:** reducer number of renders when controlled ([#100](https://github.com/zendeskgarden/react-containers/issues/100)) ([4e39d72](https://github.com/zendeskgarden/react-containers/commit/4e39d72))





## [1.1.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.1.3...@zendeskgarden/container-selection@1.1.4) (2019-09-05)

**Note:** Version bump only for package @zendeskgarden/container-selection





## [1.1.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.1.2...@zendeskgarden/container-selection@1.1.3) (2019-08-20)


### Bug Fixes

* **selection:** Effect gets caught in infinite loop in test env ([#88](https://github.com/zendeskgarden/react-containers/issues/88)) ([4f6dc02](https://github.com/zendeskgarden/react-containers/commit/4f6dc02))





## [1.1.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.1.1...@zendeskgarden/container-selection@1.1.2) (2019-07-25)

**Note:** Version bump only for package @zendeskgarden/container-selection





## [1.1.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.1.0...@zendeskgarden/container-selection@1.1.1) (2019-06-13)


### Bug Fixes

* **selection:** correctly update state if focus is in controlled mode ([#39](https://github.com/zendeskgarden/react-containers/issues/39)) ([acc4383](https://github.com/zendeskgarden/react-containers/commit/acc4383))





# [1.1.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.0.2...@zendeskgarden/container-selection@1.1.0) (2019-05-29)


### Features

* **selection|tabs:** Add defaultSelectedIndex prop ([#37](https://github.com/zendeskgarden/react-containers/issues/37)) ([93f17d8](https://github.com/zendeskgarden/react-containers/commit/93f17d8))





## [1.0.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.0.1...@zendeskgarden/container-selection@1.0.2) (2019-05-14)


### Bug Fixes

* **selection:** Add aria-orientation when direction is changed ([#35](https://github.com/zendeskgarden/react-containers/issues/35)) ([6a7720a](https://github.com/zendeskgarden/react-containers/commit/6a7720a))





## [1.0.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@1.0.0...@zendeskgarden/container-selection@1.0.1) (2019-05-13)


### Bug Fixes

* **selection|buttongroup|pagination:** Pass focusRef through as ref ([#29](https://github.com/zendeskgarden/react-containers/issues/29)) ([9eb0528](https://github.com/zendeskgarden/react-containers/commit/9eb0528))





# [1.0.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@0.3.0...@zendeskgarden/container-selection@1.0.0) (2019-05-07)


### chore

* **field|selection:** remove utility re-exports ([#32](https://github.com/zendeskgarden/react-containers/issues/32)) ([8dbc27f](https://github.com/zendeskgarden/react-containers/commit/8dbc27f))


### BREAKING CHANGES

* **field|selection:** remove temporary re-exports of `@zendeskgarden/container-utilities` made in https://github.com/zendeskgarden/react-containers/pull/30. 





# [0.3.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@0.2.3...@zendeskgarden/container-selection@0.3.0) (2019-05-06)


### Features

* **utilities:** add new `@zendesgarden/container-utilities` package ([#30](https://github.com/zendeskgarden/react-containers/issues/30)) ([fa901cc](https://github.com/zendeskgarden/react-containers/commit/fa901cc))





## [0.2.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@0.2.2...@zendeskgarden/container-selection@0.2.3) (2019-04-03)


### Bug Fixes

* **selection:** check if keyboard select is in controlled mode ([#22](https://github.com/zendeskgarden/react-containers/issues/22)) ([2cbe8f5](https://github.com/zendeskgarden/react-containers/commit/2cbe8f5))





## [0.2.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@0.2.1...@zendeskgarden/container-selection@0.2.2) (2019-04-01)


### Bug Fixes

* **selection:** correctly use controlled state to avoid weird bugs ([#21](https://github.com/zendeskgarden/react-containers/issues/21)) ([07f0d94](https://github.com/zendeskgarden/react-containers/commit/07f0d94))





## [0.2.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@0.2.0...@zendeskgarden/container-selection@0.2.1) (2019-03-13)

**Note:** Version bump only for package @zendeskgarden/container-selection





# [0.2.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@0.1.2...@zendeskgarden/container-selection@0.2.0) (2019-03-12)


### Features

* **keyboardfocus:** Introduce useKeyboardFocus hook and KeyboardFocusContainer ([#12](https://github.com/zendeskgarden/react-containers/issues/12)) ([c3cc2fa](https://github.com/zendeskgarden/react-containers/commit/c3cc2fa))





## [0.1.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-selection@0.1.1...@zendeskgarden/container-selection@0.1.2) (2019-03-06)

**Note:** Version bump only for package @zendeskgarden/container-selection





# 0.1.0 (2019-02-27)


### Features

* **selection:** introduce selection related hooks and containers ([#9](https://github.com/zendeskgarden/react-containers/issues/9)) ([569bf07](https://github.com/zendeskgarden/react-containers/commit/569bf07))
