# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.4](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-splitter@2.0.3...@zendeskgarden/container-splitter@2.0.4) (2023-02-17)

**Note:** Version bump only for package @zendeskgarden/container-splitter

## [2.0.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-splitter@2.0.2...@zendeskgarden/container-splitter@2.0.3) (2022-11-07)

### Bug Fixes

- **splitter:** update `isFixed` to leverage enter key handling ([#488](https://github.com/zendeskgarden/react-containers/issues/488)) ([05e1711](https://github.com/zendeskgarden/react-containers/commit/05e171174663d75125f2602ea003a21958a2c99c))

## [2.0.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-splitter@2.0.1...@zendeskgarden/container-splitter@2.0.2) (2022-11-01)

### Bug Fixes

- **splitter:** use WAI-ARIA specified actions and values ([#487](https://github.com/zendeskgarden/react-containers/issues/487)) ([7173f46](https://github.com/zendeskgarden/react-containers/commit/7173f46f001f1ccecc5b406e578555d7c1697077))

## [2.0.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-splitter@2.0.0...@zendeskgarden/container-splitter@2.0.1) (2022-10-10)

**Note:** Version bump only for package @zendeskgarden/container-splitter

# [2.0.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-splitter@1.0.0...@zendeskgarden/container-splitter@2.0.0) (2022-07-13)

- fix(splitter)!: refactor with improved type interfaces (#464) ([590f359](https://github.com/zendeskgarden/react-containers/commit/590f359156e4a543d808f4ccf4559b5cb1273056)), closes [#464](https://github.com/zendeskgarden/react-containers/issues/464)

### BREAKING CHANGES

- - make `aria-label` a required attribute of `getSeparatorProps` (will fix the missing label in `react-components`)

* use standard `isLeading` & `isFixed` boolean types rather than `position` and `type` enums
* shift `environment` to be optional and work off `document` rather than `window` context for API consistency
* added `separatorRef` as a required prop. This aligns the API with other Garden containers and eliminates an awkward ownership problem where the previous returned `ref` had to merge and spread in the right order. The consumer should own element ref assignments.
* remove `SplitterOrientation`, `SplitterType`, and `SplitterPosition` enum exports
* `useSplitter` no longer receives arbitrary HTML prop spread. This is inconsistent with other containers and yields arbitrary results as `composeEventHandlers` was being incorrectly applied to document- (not component-) level events.

Along with the following fixes...

- splitter drag continues to work even if the mouse leaves the page
- enhanced API readability in Storybook
- overall major simplification of `useSplitter` code with targeted memoization for callbacks that are compute intensive

# [1.0.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-splitter@0.2.3...@zendeskgarden/container-splitter@1.0.0) (2022-06-17)

**Note:** Version bump only for package @zendeskgarden/container-splitter

## [0.2.3](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-splitter@0.2.2...@zendeskgarden/container-splitter@0.2.3) (2022-05-05)

### Bug Fixes

- **splitter:** fixes focus on pointer and adds a horizontal keyboard map ([2d27f7d](https://github.com/zendeskgarden/react-containers/commit/2d27f7dd8f780ff5b5844435e8bc4143d244c945))

## [0.2.2](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-splitter@0.2.1...@zendeskgarden/container-splitter@0.2.2) (2022-03-31)

**Note:** Version bump only for package @zendeskgarden/container-splitter

## [0.2.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-splitter@0.2.0...@zendeskgarden/container-splitter@0.2.1) (2022-02-28)

**Note:** Version bump only for package @zendeskgarden/container-splitter

# [0.2.0](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-splitter@0.1.1...@zendeskgarden/container-splitter@0.2.0) (2022-01-25)

### Bug Fixes

- **splitter:** fix offset for pointer to separator alignment ([#405](https://github.com/zendeskgarden/react-containers/issues/405)) ([b1383d4](https://github.com/zendeskgarden/react-containers/commit/b1383d4bdeed1fe7b263145052e4621910ef1773))

### Features

- **splitter:** v0.2.0 ([2a566e3](https://github.com/zendeskgarden/react-containers/commit/2a566e3f949342b92ae4a42b2c33df6a16032d75))

## [0.1.1](https://github.com/zendeskgarden/react-containers/compare/@zendeskgarden/container-splitter@0.1.0...@zendeskgarden/container-splitter@0.1.1) (2021-11-30)

**Note:** Version bump only for package @zendeskgarden/container-splitter

# 0.1.0 (2021-11-08)

### Bug Fixes

- package lock files out of sync ([#396](https://github.com/zendeskgarden/react-containers/issues/396)) ([db47ef7](https://github.com/zendeskgarden/react-containers/commit/db47ef7e099977a015b8d545bff8be74efc027be))

### Features

- **splitter:** add splitter ([#384](https://github.com/zendeskgarden/react-containers/issues/384)) ([9a371bd](https://github.com/zendeskgarden/react-containers/commit/9a371bd5d270e4fb0d0753cb437b4be84c4c4543))
