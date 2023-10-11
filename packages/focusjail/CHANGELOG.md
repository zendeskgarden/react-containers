# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.12](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@2.0.11...@zendeskgarden/container-focusjail@2.0.12) (2023-10-02)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [2.0.11](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@2.0.10...@zendeskgarden/container-focusjail@2.0.11) (2023-09-28)

### Bug Fixes

- **deps:** update non-major package dependencies ([#590](https://github.com/zendeskgarden/react-containers/issues/590)) ([80c4e81](https://github.com/zendeskgarden/react-containers/commit/80c4e8131ec657b38d3e8932aa688fcd141e8cb8))

## [2.0.10](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@2.0.9...@zendeskgarden/container-focusjail@2.0.10) (2023-08-24)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [2.0.9](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@2.0.8...@zendeskgarden/container-focusjail@2.0.9) (2023-08-23)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [2.0.8](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@2.0.7...@zendeskgarden/container-focusjail@2.0.8) (2023-07-28)

### Bug Fixes

- **deps:** update non-major package dependencies ([#556](https://github.com/zendeskgarden/react-containers/issues/556)) ([6831969](https://github.com/zendeskgarden/react-containers/commit/6831969ebb4390546f0159c5803121d711ef91bd))

## [2.0.7](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@2.0.6...@zendeskgarden/container-focusjail@2.0.7) (2023-07-21)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [2.0.6](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@2.0.5...@zendeskgarden/container-focusjail@2.0.6) (2023-06-12)

### Bug Fixes

- **deps:** update non-major package dependencies ([#543](https://github.com/zendeskgarden/react-containers/issues/543)) ([08856fc](https://github.com/zendeskgarden/react-containers/commit/08856fca9b08f7434b91bf1b95b4d2fff497d75f))

## [2.0.5](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@2.0.4...@zendeskgarden/container-focusjail@2.0.5) (2023-04-19)

### Bug Fixes

- **deps:** update non-major package dependencies ([#528](https://github.com/zendeskgarden/react-containers/issues/528)) ([5df36aa](https://github.com/zendeskgarden/react-containers/commit/5df36aa7c5e78dc0da79a95416e915cc8e1348da))

## [2.0.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@2.0.3...@zendeskgarden/container-focusjail@2.0.4) (2023-03-17)

### Bug Fixes

- update size snapshots ([#524](https://github.com/zendeskgarden/react-containers/issues/524)) ([67c3f83](https://github.com/zendeskgarden/react-containers/commit/67c3f83a41f89ec3a6dfde986c85405b893f7b74))

## [2.0.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@2.0.2...@zendeskgarden/container-focusjail@2.0.3) (2023-03-17)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [2.0.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@2.0.1...@zendeskgarden/container-focusjail@2.0.2) (2023-02-17)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [2.0.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@2.0.0...@zendeskgarden/container-focusjail@2.0.1) (2022-10-10)

### Bug Fixes

- **deps:** update dependency tabbable to v6 ([#480](https://github.com/zendeskgarden/react-containers/issues/480)) ([b28beb3](https://github.com/zendeskgarden/react-containers/commit/b28beb335a3e81fe1702a15d5f063c09cd262804))

# [2.0.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.4.13...@zendeskgarden/container-focusjail@2.0.0) (2022-06-17)

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

## [1.4.13](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.4.12...@zendeskgarden/container-focusjail@1.4.13) (2022-02-28)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [1.4.12](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.4.11...@zendeskgarden/container-focusjail@1.4.12) (2021-11-30)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [1.4.11](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.4.10...@zendeskgarden/container-focusjail@1.4.11) (2021-11-08)

### Bug Fixes

- package lock files out of sync ([#396](https://github.com/zendeskgarden/react-containers/issues/396)) ([db47ef7](https://github.com/zendeskgarden/react-containers/commit/db47ef7e099977a015b8d545bff8be74efc027be))

## [1.4.10](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.4.9...@zendeskgarden/container-focusjail@1.4.10) (2021-09-27)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [1.4.9](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.4.8...@zendeskgarden/container-focusjail@1.4.9) (2021-09-03)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [1.4.8](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.4.7...@zendeskgarden/container-focusjail@1.4.8) (2021-09-02)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [1.4.7](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.4.6...@zendeskgarden/container-focusjail@1.4.7) (2021-08-16)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [1.4.6](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.4.5...@zendeskgarden/container-focusjail@1.4.6) (2021-02-25)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [1.4.5](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.4.4...@zendeskgarden/container-focusjail@1.4.5) (2021-01-15)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [1.4.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.4.3...@zendeskgarden/container-focusjail@1.4.4) (2020-10-23)

### Bug Fixes

- **deps:** update dependency tabbable to v5 ([#248](https://github.com/zendeskgarden/react-containers/issues/248)) ([0388eb4](https://github.com/zendeskgarden/react-containers/commit/0388eb4bc585646fdeb28d5150339740f18dfcbd))
- **focusjail:** use tab focusTrap option in test ([#250](https://github.com/zendeskgarden/react-containers/issues/250)) ([207c42a](https://github.com/zendeskgarden/react-containers/commit/207c42a0e505610f4578501cdddd1e73105c4ebd))

## [1.4.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.4.2...@zendeskgarden/container-focusjail@1.4.3) (2020-06-10)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [1.4.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.4.1...@zendeskgarden/container-focusjail@1.4.2) (2020-04-06)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [1.4.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.4.0...@zendeskgarden/container-focusjail@1.4.1) (2020-03-23)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

# [1.4.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.3.2...@zendeskgarden/container-focusjail@1.4.0) (2020-02-21)

### Features

- **useFocusJail:** return focus ([#161](https://github.com/zendeskgarden/react-containers/issues/161)) ([1f4d64a](https://github.com/zendeskgarden/react-containers/commit/1f4d64a0ef922ce1f9e3b8d7ed4c639e35ca6e97))

## [1.3.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.3.1...@zendeskgarden/container-focusjail@1.3.2) (2020-02-20)

### Bug Fixes

- **build:** improve bundle size with @babel/runtime ([#162](https://github.com/zendeskgarden/react-containers/issues/162)) ([506504c](https://github.com/zendeskgarden/react-containers/commit/506504c840795f34e420b016b94cef10440a30cb))

## [1.3.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.3.0...@zendeskgarden/container-focusjail@1.3.1) (2020-02-14)

### Bug Fixes

- **build:** apply babel to all bundles ([#160](https://github.com/zendeskgarden/react-containers/issues/160)) ([826735b](https://github.com/zendeskgarden/react-containers/commit/826735bba881d5247b423ffb61cf9643c6599d16))

# [1.3.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.2.4...@zendeskgarden/container-focusjail@1.3.0) (2020-02-12)

### Features

- **build:** introduce rollup for CJS and ES module bundles ([#158](https://github.com/zendeskgarden/react-containers/issues/158)) ([58313d4](https://github.com/zendeskgarden/react-containers/commit/58313d486e3bfa023e2c9d090149d7ec358d0cd0))

## [1.2.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.2.3...@zendeskgarden/container-focusjail@1.2.4) (2020-01-15)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [1.2.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.2.2...@zendeskgarden/container-focusjail@1.2.3) (2019-11-04)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [1.2.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.2.1...@zendeskgarden/container-focusjail@1.2.2) (2019-10-22)

### Bug Fixes

- update render prop function return types ([#121](https://github.com/zendeskgarden/react-containers/issues/121)) ([eaea3fd](https://github.com/zendeskgarden/react-containers/commit/eaea3fd61a16085ef480ddbd2d67aa377738db36))

## [1.2.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.2.0...@zendeskgarden/container-focusjail@1.2.1) (2019-10-16)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

# [1.2.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.1.5...@zendeskgarden/container-focusjail@1.2.0) (2019-10-15)

### Features

- **focusjail:** migrate focusjail to TypeScript ([#113](https://github.com/zendeskgarden/react-containers/issues/113)) ([e428b03](https://github.com/zendeskgarden/react-containers/commit/e428b03))

## [1.1.5](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.1.4...@zendeskgarden/container-focusjail@1.1.5) (2019-09-25)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [1.1.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.1.3...@zendeskgarden/container-focusjail@1.1.4) (2019-09-19)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [1.1.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.1.2...@zendeskgarden/container-focusjail@1.1.3) (2019-09-13)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [1.1.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.1.1...@zendeskgarden/container-focusjail@1.1.2) (2019-09-05)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

## [1.1.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.1.0...@zendeskgarden/container-focusjail@1.1.1) (2019-07-25)

**Note:** Version bump only for package @zendeskgarden/container-focusjail

# [1.1.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.0.0...@zendeskgarden/container-focusjail@1.1.0) (2019-05-06)

### Features

- **utilities:** add new `@zendesgarden/container-utilities` package ([#30](https://github.com/zendeskgarden/react-containers/issues/30)) ([fa901cc](https://github.com/zendeskgarden/react-containers/commit/fa901cc))

# [1.0.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@0.1.0...@zendeskgarden/container-focusjail@1.0.0) (2019-05-01)

### Bug Fixes

- **focusjail:** Handle conditional rendering and ref passing ([#26](https://github.com/zendeskgarden/react-containers/issues/26)) ([7b2f482](https://github.com/zendeskgarden/react-containers/commit/7b2f482))

### BREAKING CHANGES

- **focusjail:** The `@zendeskgarden/container-focusjail` now requires a ref named `containerRef` to be passed into it e.g.

```js
import { useRef } from 'react';
import { useFocusJail } from '@zendeskgarden/container-focusjail';

const FocusJail = () => {
  const containerRef = useRef(null);
  const { getContainerProps } = useFocusJail({containerRef});

  return <div {...getContainerProps({ref: containerRef}) />
}
```

# 0.1.0 (2019-04-12)

### Features

- **focusjail:** Introduce useFocusJail and FocusJailContainer ([#23](https://github.com/zendeskgarden/react-containers/issues/23)) ([6984d6e](https://github.com/zendeskgarden/react-containers/commit/6984d6e))
