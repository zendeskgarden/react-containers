# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
