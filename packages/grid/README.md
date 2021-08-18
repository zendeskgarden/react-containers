# @zendeskgarden/container-grid [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-grid
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-grid

This package includes containers relating to Grid in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-grid
```

## Usage

Check out [storybook](https://zendeskgarden.github.io/react-containers) for live examples.

### useGrid

The following code demonstrates uncontrolled usage of the `useGrid` hook. Controlled usage examples
can be found in the stories.

```jsx static
import { useGrid } from '@zendeskgarden/container-grid';

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const Grid = () => {
  const { getGridCellProps } = useGrid({ matrix });

  return (
    <table role="grid">
      <tbody>
        {matrix.map((row, rowIdx) => (
          <tr key={`rowIdx-${row[0]}`}>
            {row.map((item, colIdx) => (
              <td role="presentation" key={item}>
                <button
                  {...getGridCellProps({
                    rowIdx,
                    colIdx,
                    'aria-label': `cell for ${item}}`
                  })}
                >
                  {item}
                </button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
```

### GridContainer

```jsx static
import { GridContainer } from '@zendeskgarden/container-grid';

const matrix = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
]

<GridContainer>
  {({ getGridCellProps }) => (
    <table role="grid">
      <tbody>
        {matrix.map((row, rowIdx) => (
          <tr key={`rowIdx-${row[0]}`}>
            {row.map((item, colIdx) => (
              <td role="presentation" key={item}>
                <button
                  {...getGridCellProps({
                    rowIdx,
                    colIdx,
                    'aria-label': `cell for ${item}}`
                  })}
                >
                  {item}
                </button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )}
</GridContainer>;
```
