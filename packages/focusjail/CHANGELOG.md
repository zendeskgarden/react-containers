# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.3.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.3.0...@zendeskgarden/container-focusjail@1.3.1) (2020-02-14)


### Bug Fixes

* **build:** apply babel to all bundles ([#160](https://github.com/zendeskgarden/react-containers/issues/160)) ([826735b](https://github.com/zendeskgarden/react-containers/commit/826735bba881d5247b423ffb61cf9643c6599d16))





# [1.3.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.2.4...@zendeskgarden/container-focusjail@1.3.0) (2020-02-12)


### Features

* **build:** introduce rollup for CJS and ES module bundles ([#158](https://github.com/zendeskgarden/react-containers/issues/158)) ([58313d4](https://github.com/zendeskgarden/react-containers/commit/58313d486e3bfa023e2c9d090149d7ec358d0cd0))





## [1.2.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.2.3...@zendeskgarden/container-focusjail@1.2.4) (2020-01-15)

**Note:** Version bump only for package @zendeskgarden/container-focusjail





## [1.2.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.2.2...@zendeskgarden/container-focusjail@1.2.3) (2019-11-04)

**Note:** Version bump only for package @zendeskgarden/container-focusjail





## [1.2.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.2.1...@zendeskgarden/container-focusjail@1.2.2) (2019-10-22)


### Bug Fixes

* update render prop function return types ([#121](https://github.com/zendeskgarden/react-containers/issues/121)) ([eaea3fd](https://github.com/zendeskgarden/react-containers/commit/eaea3fd61a16085ef480ddbd2d67aa377738db36))





## [1.2.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.2.0...@zendeskgarden/container-focusjail@1.2.1) (2019-10-16)

**Note:** Version bump only for package @zendeskgarden/container-focusjail





# [1.2.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@1.1.5...@zendeskgarden/container-focusjail@1.2.0) (2019-10-15)


### Features

* **focusjail:** migrate focusjail to TypeScript ([#113](https://github.com/zendeskgarden/react-containers/issues/113)) ([e428b03](https://github.com/zendeskgarden/react-containers/commit/e428b03))





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

* **utilities:** add new `@zendesgarden/container-utilities` package ([#30](https://github.com/zendeskgarden/react-containers/issues/30)) ([fa901cc](https://github.com/zendeskgarden/react-containers/commit/fa901cc))





# [1.0.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-focusjail@0.1.0...@zendeskgarden/container-focusjail@1.0.0) (2019-05-01)


### Bug Fixes

* **focusjail:** Handle conditional rendering and ref passing ([#26](https://github.com/zendeskgarden/react-containers/issues/26)) ([7b2f482](https://github.com/zendeskgarden/react-containers/commit/7b2f482))


### BREAKING CHANGES

* **focusjail:** The `@zendeskgarden/container-focusjail` now requires a ref named `containerRef` to be passed into it e.g.

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

* **focusjail:** Introduce useFocusJail and FocusJailContainer ([#23](https://github.com/zendeskgarden/react-containers/issues/23)) ([6984d6e](https://github.com/zendeskgarden/react-containers/commit/6984d6e))
