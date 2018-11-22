[![Build Status](https://badgen.net/travis/danoc/clickable-box)](https://travis-ci.com/danoc/clickable-box) [![Code Coverage](https://badgen.net/codecov/c/github/danoc/clickable-box)](https://codecov.io/gh/danoc/clickable-box)

# clickable-box

## Props

There are a few props that are built into `ClickableBox`.

| prop      | type                                            | description                                       |
| --------- | ----------------------------------------------- | ------------------------------------------------- |
| `onClick` | `function` \| _required_                        | The action to perform when the element is pressed |
| `is`      | `string`, `React.Element` \| defaults to: `div` | The element to render                             |
| `ref`     | `React.Ref`                                     | Provides access to the React element              |

You can pass any custom prop as well since this component spreads all of the props on the rendered element.
