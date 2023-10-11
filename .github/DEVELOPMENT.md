# Garden React Development

This is a multi-package repo which uses [Lerna](https://lernajs.io/) to
manage shared and cross-package dependencies.

For further contribution guidelines view our [contribution documentation](CONTRIBUTING.md).

All packages must be implemented following the requirements listed below.

## Creating New Packages

We have abstracted the creation of packages into the `npm run new` command. When prompted, provide a base name for your package (i.e. if provided "example" the command will create the `@zendeskgarden/container-example` package in the `packages/example` path).

### Dependencies

All dependencies required by a package must be kept in its specific `package.json`. The `lerna add` command can help automate this.

### Documentation

Documentation is generated for each package using [react-styleguidist](https://react-styleguidist.js.org/).

A shared, global config (including webpack modifications) can be found at [utils/styleguide/styleguide.base.config.js](utils/styleguide/styleguide.base.config.js).

Each package can override the global config with its local `styleguide.config.js` file. The most common use case for this is creating a sidebar layout custom to the packages directory structure.

To include examples with your code include a markdown file. `FooContainer.js` would be documented with `FooContainer.example.md`.

To start the documentation in development mode use the `npm start` command.

## Component Requirements

### Containers

All containers must

- Be implemented using the [render prop pattern](https://reactjs.org/docs/render-props.html)
- Provide `uncontrolled` and `controlled` state management if necessary
  - Be implemented with the `ControlledComponent` state abstractions if necessary
- Provide the minimum number of events and attributes to implement the appropriate [W3C WAI-ARIA Design Pattern](https://www.w3.org/TR/wai-aria-practices/#aria_ex)
- Only use events and attributes that work with **ANY** DOM element (within reason)

## Building Containers

The packages are built using webpack which creates several artifacts:

- `commonjs` bundle
  - Used by the majority of consumers
  - All dependencies are `external` and not included in the bundle
- `umd` bundle
  - Can be consumed in browser with a standard `<script>` tag
  - All dependencies are bundled to allow easy consumption

## Testing Components

All `Container` components must only test the surface area that they are implementing. (i.e. Since `TabsContainer` is implemented with the `SelectionContainer` it does not need to test all keyboard navigation).

These tests should be implemented with standard assertions using the Enzyme shallow renderer when possible.

## Linting and Formatting Components

All JS and Markdown files are linted respectively with eslint, and markdownlint.

Additionally, prettier is used to format all JS, Markdown, and package.json files.
